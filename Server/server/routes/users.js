const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Order } = require('../models/Order');
const { Token } = require('../models/Token');
// if willing to use sendinblue api key for nodemailer
const sibTransport = require('nodemailer-sendinblue-transport');
// for verification email
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const { auth } = require('../middleware/auth');

// =================================             User
// =================================

//google Auth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID =
  '43754873917-itslpvbfof22ribqlb7koujgskhpfq6p.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    dateOfBirth: req.user.dateOfBirth,
    gender: req.user.gender,
    contactNo: req.user.contactNo,
    burppcred: req.body.burppcred,
  });
});

router.post('/googleauth', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    //checking(veriying) frontend and backend user details for more secure way
    idToken: token,
    audience: CLIENT_ID,
  });

  console.log('ticket--------------------------------------------->', ticket);

  const { given_name, family_name, email, picture } = ticket.getPayload();

  let user = await User.findOne({ email: email });

  if (user) {
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie('w_authExp', user.tokenExp);
      res.cookie('w_auth', user.token).status(200).json({
        email: user.email,
        name: user.name,
        userId: user._id,
        success: true,
      });
    });
  } else {
    user = await User.create({
      name: given_name,
      lastname: family_name,
      email,
      isVerified: true,
    });

    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie('w_authExp', user.tokenExp);
      res.cookie('w_auth', user.token).status(200).json({
        email: user.email,
        name: user.name,
        userId: user._id,
        success: true,
      });
    });
  }
});

router.post('/register', async (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    async (err, existingUser) => {
      if (err) {
        next(err);
      }
      if (existingUser) {
        console.log('That email address is already in use.');
        return res
          .status(400)
          .json({ message: 'That email address is already in use.' });
      }
      const user = new User(req.body);
      console.log(req.body);
      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        var token = new Token({
          _userId: user._id,
          token: crypto.randomBytes(16).toString('hex'),
        });
        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }

          const transporter = nodemailer.createTransport({
            service: 'SendinBlue',
            auth: {
              user: 'support@burppit.com',
              pass: 'M0AP1HbOEJNyGjXs',
            },
          });
          var mailOptions = {
            from: 'support@burppit.com',
            to: user.email,
            subject: 'Account Verification Token',
            text:
              'Hello ' +
              req.body.name +
              ',\n\nPlease verify your account by copying and pasting the link given below in y' +
              'our browser: \nhttp://' +
              req.headers.host +
              '/api/users/confirmation/' +
              user.email +
              '/' +
              token.token +
              '\n\nThank You!\n',
            html: `
             <h2>Hello<\h2>
             <p>Please verify your account by clicking the link<\p>
            <a href="http://${req.headers.host}/api/users/confirmation/${user.email}/${token.token}">Verify Account<\a>
            `,
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              console.log(err);
              return res.status(500).send({ msg: err.message });
            }
            res
              .status(200)
              .send('Thanks for joining Burpp.Please verify your account.');
          });
        });
      });
    }
  );
});

router.get('/confirmation/:email/:token', (req, res, next) => {
  // Find a matching token
  res.setHeader('Content-type', 'text/html');
  Token.findOne(
    {
      token: req.params.token,
    },
    function (err, token) {
      if (!token)
        return res
          .status(400)
          .send(
            '<h1 style="text-align:center;">We were unable to find a valid token. Your token ' +
              'may have expired.Try Again</h1>'
          );

      // If we found a token, find a matching user
      User.findOne(
        {
          _id: token._userId,
          email: req.params.email,
        },
        function (err, user) {
          if (err) {
            return res.status(500).send(err.message);
          }
          if (!user)
            return res
              .status(400)
              .send(
                '<h1 style="text-align:center;">We were unable to find a user for this token.</h1' +
                  '>'
              );
          if (user.isVerified)
            return res
              .status(400)
              .send(
                '<h1 style="text-align:center;">This user has already been verified.</h1>'
              );

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
            if (err) {
              return res.status(500).send(err.message);
            }
            res
              .status(200)
              .send(
                '<h1 style="text-align:center;">The account has been verified. Please log in.</h1' +
                  '>'
              );
          });
        }
      );
    }
  );
});

router.post('/resend', (req, res, next) => {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified)
        return res.status(400).send({
          msg: 'This account has already been verified. Please log in.',
        });

      // Save the token
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: 'not verified' });
        }
        //SMTP account is not yet activated
        const transporter = nodemailer.createTransport({
          service: 'SendinBlue',
          auth: {
            user: 'support@burppit.com',
            pass: 'M0AP1HbOEJNyGjXs',
          },
        });
        var mailOptions = {
          from: 'support@burppit.com',
          to: user.email,
          subject: 'Account Verification Token',
          text:
            'Hello ' +
            req.body.name +
            ',\n\nPlease verify your account by copying and pasting the link given below in y' +
            'our browser: \nhttp://' +
            req.headers.host +
            '/api/users/confirmation/' +
            user.email +
            '/' +
            token.token +
            '\n\nThank You!\n',
          html: `
             <h2>Hello<\h2>
             <p>Please verify your account by clicking the link<\p>
            <a href="http://${req.headers.host}/api/users/confirmation/${user.email}/${token.token}">Verify Account<\a>
            `,
        };

        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            console.log('Unable to send the mail');
            return res.status(500).send({ msg: err.message });
          }
          res
            .status(200)
            .send('Thanks for joining Burpp.Please verify your account.');
        });
      });
    }
  );
});

// router.post("/register", (req, res) => {     User.findOne({ email:
// req.body.email }, async (err, existingUser) => {             if (err) {
//            next(err);             }             if (existingUser) {
//         console.log("That email address is already in use.");
//   return res                  .status(400)                  .json({ message:
// "That email address is already in use." });            }     const user = new
// User(req.body);     user.save((err, doc) => {         if (err) return
// res.json({ success: false, err });         return res.status(200).json({
//        success: true         });     }); }); });

router.post('/login', (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user)
        return res.json({
          loginSuccess: false,
          message: 'Auth failed, email not found',
        });
      if (!user.isVerified)
        return res.status(401).send({
          type: 'not-verified',
          msg: 'Your account has not been verified.',
        });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: 'Wrong password' });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie('w_authExp', user.tokenExp);
          res
            .cookie('w_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, user });
        });
      });
    }
  );
});

router.post('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      token: '',
      tokenExp: '',
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    }
  );
});

router.post('/updateBurppCred', (req, res) => {
  User.findOne(
    {
      _id: req.body.userID,
    },
    (err, result) => {
      if (err) return res.status(400).json({ success: false, err });

      // change burppcred according to offer
      var newcred = result.burppcred + req.creditQuantity;
      User.findOneAndUpdate(
        {
          _id: req.body.userID,
        },
        {
          $set: {
            burppcred: newcred,
          },
        },
        {
          new: true,
        },
        (err, result) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).json({
            msg: 'Congrats your bruppcreds are added to your account.',
          });
        }
      );
    }
  );
});

router.post('/getOrders', (req, res) => {
  Order.find({ userID: req.body.userID })
    // .populate(User.find({'_id': req.body.userID }).orderHistory)
    .exec((err, orders) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, orders });
    });
});

router.post('/getRefCode', (req, res) => {
  User.findById(req.body.userID, (err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, refCode: result.refCode });
  });
});

router.post('/referSuccess', (req, res) => {
  User.findOne(
    {
      refCode: req.body.refCode,
    },
    (err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      if (!result) {
        return res.status(400).json({
          success: false,
          msg: 'Invalid Referral Code,Please Try Again',
        });
      }
      // change burppcred according to offer console.log(result); console.log("Checl")
      var newcred = result.burppcred + 20;
      User.findOneAndUpdate(
        {
          _id: result._id,
        },
        {
          $set: {
            burppcred: newcred,
          },
        },
        {
          new: true,
        },
        (err, result) => {
          if (err) return res.status(400).json({ success: false, err });
          User.findById(req.body.userID, (err, result2) => {
            if (err) return res.status(400).json({ success: false, err });

            // change burppcred according to offer console.log(result2) console.log("Check")
            var newcred = result2.burppcred + 20;
            User.findOneAndUpdate(
              {
                _id: req.body.userID,
              },
              {
                $set: {
                  burppcred: newcred,
                },
              },
              {
                new: true,
              },
              (err, result) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({
                  success: true,
                  msg: 'Congrats your BurppCreds are added to your account.',
                });
              }
            );
          });
        }
      );
    }
  );
});

module.exports = router;
