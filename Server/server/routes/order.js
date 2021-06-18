const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const { Food_item } = require('../models/Food_item');
const { auth2 } = require('../middleware/auth2');
const { User } = require('../models/User');
const { Restaurant } = require('../models/Restaurant');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const InvalidRequestError = require('../Exceptions/InvalidRequestException');
const { request } = require('express');
const easyinvoice = require('easyinvoice');

router.post('/postOrder', (req, res) => {
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) return res.json({ success: false, err: err });

    Order.findOne({ _id: order._id }).exec((err, result) => {
      if (err) return res.json({ success: false, err });
      let foodItems = result.foodItems;
      let k = 0;
      foodItems.foodItemQtys.forEach((qt) => {
        let i = k;
        Food_item.findOne(
          {
            _id: foodItems.foodItemIds[i],
          },
          (err, result) => {
            if (err) return res.json(400).send(err);
            var q = result.qty - qt;
            Food_item.findOneAndUpdate(
              {
                _id: foodItems.foodItemIds[i],
              },
              {
                $set: {
                  qty: q,
                },
              },
              {
                new: true,
              },
              (err, result) => {
                if (err) return res.status(400).send(err);
                if (result.qty <= 0)
                  return res.json({
                    success: false,
                    err: 'Not enough items available.',
                  });
              }
            );
          }
        );
        k = k + 1;
      });
      User.findOne(
        {
          _id: req.body.userID,
        },
        (err, user) => {
          if (err) return res.json(400).send(err);
          user.orderHistory.push(result);
          user.save((err, person) => {
            if (err) return res.json({ success: false, err: err });
          });
        }
      );

      Restaurant.findOne(
        {
          _id: req.body.restaurantID,
        },
        (err, restaurant) => {
          if (err) return res.json(400).send(err);
          var r = restaurant.orders + 1;
          Restaurant.findOneAndUpdate(
            {
              _id: restaurant._id,
            },
            {
              $set: {
                orders: r,
              },
            },
            {
              new: true,
            },
            (err, result) => {
              if (err) return res.status(400).send(err);
            }
          );
        }
      );

      Restaurant.findOne(
        {
          _id: req.body.restaurantID,
        },
        (err, restaurant) => {
          if (err) return res.json(400).send(err);
          restaurant.orderHistory.push(result);
          restaurant.save((err, caterer) => {
            if (err) return res.json({ success: false, err: err });
          });
        }
      );

      return res.status(200).json({ success: true, result });
    });
  });
});

router.post('/postOrder_v2', async (req, res) => {
  const order = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();
  let orderValue = 0;
  order.foodItems.foodItemPrices = [];
  order.foodItems.foodItemNames = [];
  order.foodItems.foodItemImages = [];

  try {
    const user = await User.findOne({ _id: req.body.userID });
    if (user == null) {
      throw new InvalidRequestError('Invalid userID');
    }
    for (let i = 0; i < order.foodItems.foodItemIds.length; i++) {
      let foodItem = await Food_item.findOne({
        _id: order.foodItems.foodItemIds[i],
      });
      if (foodItem == null) {
        throw new InvalidRequestError('Invalid foodItemID');
      }
      if (foodItem.qty < order.foodItems.foodItemQtys[i]) {
        throw new InvalidRequestError('Not enough items available');
      }
      if (!order.restaurantID) {
        order.restaurantID = foodItem.restaurantID;
      }
      await Food_item.findOneAndUpdate(
        {
          _id: order.foodItems.foodItemIds[i],
        },
        {
          $inc: {
            qty: -order.foodItems.foodItemQtys[i],
          },
        }
      );
      orderValue += order.foodItems.foodItemQtys[i] * foodItem.price;
      order.foodItems.foodItemPrices.push(foodItem.price);
      order.foodItems.foodItemNames.push(foodItem.name);
      if (foodItem.images.length !== 0)
        order.foodItems.foodItemImages.push(foodItem.images[0]);
    }

    order.total = orderValue;
    order.completed = false;
    order.userName = user.name + ' ' + user.lastname;
    const result = await new Order(order).save();
    user.orderHistory.push(result._id);
    await user.save();
    const restaurant = await Restaurant.findOne({ _id: order.restaurantID });
    restaurant.orderHistory.push(result._id);
    await restaurant.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ success: true, result });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    if (err instanceof InvalidRequestError) {
      res.status(400).send({
        success: false,
        error: err.getMessage(),
      });
    } else {
      res.status(500).send({ success: false, error: 'Internal server error' });
    }
  }
});

router.post('/getOrder', (req, res) => {
  Order.find({ userID: req.body._id }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, result });
  });
});

router.get('/getOrder', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.query.orderID });
    if (order == null) {
      throw new InvalidRequestError('Invalid orderID');
    }
    res.send({ success: true, result: order });
  } catch (err) {
    res.status(404).send({
      success: false,
      err: err.getMessage(),
    });
  }
});

router.post('/getOrders/restaurant', (req, res) => {
  Order.find({ restaurantID: req.body.restaurantID })
    .populate('restaurantID')
    .exec((err, orders) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, orders });
    });
});

router.post('/getPendingOrders/restaurant', (req, res) => {
  const restaurant = Order.findOne({ restaurantID: req.body.restaurantID });
  if (restaurant) {
    Order.find({ restaurantID: req.body.restaurantID, completed: false }).exec(
      (err, orders) => {
        if (err) return res.status(400).send(err.message);
        res.status(200).json({ success: true, orders });
      }
    );
  }
});

router.post('/completeOrder', async (req, res) => {
  Order.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        completed: true,
        paymentSuccess: true,
      },
    },
    {
      new: true,
    },
    async (err, order) => {
      if (err) return res.status(400).send(err);
      //Import the library into your project
      var easyinvoice = require('easyinvoice');
      var items = [];
      // console.log(order.created.toDateString());
      for (var i = 0; i < order.foodItems.foodItemIds.length; i++) {
        items.push({
          // foodID:order.foodItem.foodItemIds[i],
          description: order.foodItems.foodItemNames[i],
          price: order.foodItems.foodItemPrices[i],
          quantity: order.foodItems.foodItemQtys[i],
          tax: 15,
        });
      }
      // console.log(items);
      var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        currency: 'INR',
        taxNotation: 'CGST(7.5%)+SGST(7.5%)', //or gst
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        // "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
        // "logoExtension": "png", //only when logo is base64
        sender: {
          company: 'Burpp India',
          address: 'Sample Street 123',
          zip: '1234 AB',
          city: 'Sampletown',
          country: 'Samplecountry',
          // "custom1": "custom value 1",
          // "custom2": "custom"
          // value 2", "custom3": "custom value 3"
        },
        client: {
          company: order.userName ? order.userName : 'USER' + order.userID,
          address: '',
          zip: '',
          city: '',
          country: '',
          //  "custom1": "custom value 1", "custom2": "custom"
          // value 2", "custom3": "custom value 3"
        },
        invoiceNumber: order._id,
        invoiceDate: order.created.toDateString(),
        products: items,
        // "bottomNotice": "Kindly pay your invoice within 15 days."
      };

      //Create your invoice! Easy!
      await easyinvoice.createInvoice(data, function (result, err) {
        if (err) return res.send(err);

        // The response will contain a base64 encoded PDF file console.log(result.pdf);
        // console.log(order);
        User.findOne(
          {
            _id: order.userID,
          },
          async function (err, user) {
            if (err) return res.status(500).send(err.message);

            const transporter = nodemailer.createTransport({
              service: 'SendinBlue',
              auth: {
                user: 'support@burppit.com',
                pass: 'M0AP1HbOEJNyGjXs',
              },
            });
            // console.log("CHECK")
            // console.log(user);
            // console.log("check")
            // console.log(user.name,user.email);
            var mailOptions = {
              from: 'support@burppit.com',
              to: user.email,
              subject: 'Tax Invoice for your Order',
              text:
                'Hello ' +
                user.name +
                ',\n\nPlease Find attached the tax invoice for your order',
              html: `
                            <h2>Hello<\h2>
                            <p>Please Find attached the tax invoice for your order<\p>
                        `,
              attachments: [
                {
                  filename: 'Invoice.pdf',
                  content: result.pdf,
                  encoding: 'base64',
                },
              ],
            };
            await transporter.sendMail(mailOptions, function (err) {
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // console.log("Success");
            });
          }
        );
      });
      res.status(200).json({ success: true, order });
    }
  );
});

router.post('/completePayment', (req, res) => {
  Order.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { paymentSuccess: true } },
    { new: true },
    (err, order) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, order });
    }
  );
});

router.post('/cancelOrder', async (req, res) => {
  try {
    const order = await Order.findOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          completed: false,
        },
      },
      { new: true }
    );
    order.completed = false;
    await order.save();
    await res.send('Order cancelled successfully');
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
