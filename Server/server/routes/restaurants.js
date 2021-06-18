const express = require('express');
const router = express.Router();
const {Restaurant} = require("../models/Restaurant");
const {Token2} = require("../models/Token2");
// if willing to use sendinblue api key for nodemailer
const sibTransport = require('nodemailer-sendinblue-transport');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const {auth2} = require("../middleware/auth2");
const {Order} = require("../models/Order");

router.get("/auth2", auth2, (req, res) => {
    res
        .status(200)
        .json({
            _id: req.restaurant._id,
            isAuth: true,
            email: req.restaurant.email,
            staffName: req.restaurant.staffName,
            lastname: req.restaurant.lastname,
            contactNo: req.restaurant.contactNo,
            restaurantName: req.restaurant.restaurantName,
            Pincode: req.restaurant.Pincode,
            Address: req.restaurant.Address,
            description: req.restaurant.description,
            images: req.restaurant.images,
            category: req.restaurant.category,
            isParent: req.restaurant.parentID,
            latitude: req.restaurant.latitude,
            longitude: req.restaurant.longitude
        });
});

router.post("/register", async(req, res) => {

    Restaurant.findOne({
        email: req.body.email
    }, async(err, existingRestaurantUser) => {
        if (err) {
            next(err);
        }
        if (existingRestaurantUser) {
            console.log("That email address is already in use.");
            return res
                .status(400)
                .json({message: "That email address is already in use."});
        }
        const restaurantUser = new Restaurant(req.body);
        console.log(req.body);
        restaurantUser.save((err, doc) => {
            if (err) 
                return res.json({success: false, err});
            
            var token = new Token2({
                _restaurantUserId: restaurantUser._id,
                token: crypto
                    .randomBytes(16)
                    .toString('hex')
            });
            token.save(function (err) {
                if (err) {
                    return res
                        .status(500)
                        .send({msg: err.message});
                }

                const transporter = nodemailer.createTransport({
                    service: 'SendinBlue',
                    // SMTP account is not yet activated SMTP account is not verified it will be
                    // verfied when website is live.
                    auth: {
                        user: 'support@burppit.com',
                        pass: 'M0AP1HbOEJNyGjXs'
                    }
                });
                var mailOptions = {
                    from: 'support@burppit.com',
                    to: restaurantUser.email,
                    subject: 'Account Verification Token.',
                    text: 'Hello ' + req.body.staffName + ',\n\nPlease verify your account by copying and pasting the link given below in y' +
                            'our browser: \nhttp:\/\/' + req.headers.host + '\/api\/restaurants\/confirmation\/' + restaurantUser.email + '\/' + token.token + '\n\nThank You!\n',
                    html: `
             <h2>Hello<\h2>
             <p>Please verify your account by clicking the link.<\p>
            <a href="http://${req.headers.host}/api/restaurants/confirmation/${restaurantUser.email}/${token.token}">Verify Account<\a>
            `
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        console.log(err);
                        return res
                            .status(500)
                            .send({msg: err.message});
                    }
                    res
                        .status(200)
                        .send("Thanks for joining Burpp. Please verify your account.");
                });
            });
        });
    });
});

router.get('/confirmation/:email/:token', (req, res, next) => {

    console.log(req.params.token);
    Token2.findOne({
        token: req.params.token
    }, function (err, token) {
        if (!token) 
            return res.status(400).send({type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.'});
        
        Restaurant
            .findOne({
                _id: token._restaurantUserId,
                email: req.params.email
            }, function (err, restaurantUser) {
                if (!restaurantUser) 
                    return res.status(400).send({msg: 'We were unable to find a user for this token.'});
                if (restaurantUser.isVerified) 
                    return res.status(400).send({type: 'already-verified', msg: 'This user has already been verified.'});
                if (err) {
                    return res
                        .status(500)
                        .send({msg: err.message});
                }

                restaurantUser.isVerified = true;
                restaurantUser.save(function (err) {
                    if (err) {
                        return res
                            .status(500)
                            .send({msg: err.message});
                    }
                    res
                        .status(200)
                        .send("The account has been verified. Please log in.");
                });
            });
    });
});

router.post('/resend', (req, res, next) => {

    Restaurant
        .findOne({
            email: req.body.email
        }, function (err, restaurantUser) {
            if (!restaurantUser) 
                return res.status(400).send({msg: 'We were unable to find a user with that email.'});
            if (restaurantUser.isVerified) 
                return res.status(400).send({msg: 'This account has already been verified. Please log in.'});
            
            var token = new Token2({
                _restaurantUserId: restaurantUser._id,
                token: crypto
                    .randomBytes(16)
                    .toString('hex')
            });
            token.save(function (err) {
                if (err) {
                    return res
                        .status(500)
                        .send({msg: "not verified"});
                }
                //SMTP account is not yet activated
                const transporter = nodemailer.createTransport({
                    service: 'SendinBlue',
                    auth: {
                        user: 'burppit@gmail.com',
                        pass: 'M0AP1HbOEJNyGjXs'
                    }
                });
                var mailOptions = {
                    from: 'burppit@gmail.com',
                    to: restaurantUser.email,
                    subject: 'Account Verification Token.',
                    text: 'Hello ' + req.body.staffName + ',\n\nPlease verify your account by copying and pasting the link given below in y' +
                            'our browser: \nhttp:\/\/' + req.headers.host + '\/api\/restaurants\/confirmation\/' + restaurantUser.email + '\/' + token.token + '\n\nThank You!\n',
                    html: `
             <h2>Hello<\h2>
             <p>Please verify your account by clicking the link.<\p>
            <a href="http://${req.headers.host}/api/restaurants/confirmation/${restaurantUser.email}/${token.token}">Verify Account<\a>
            `

                };

                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        console.log("Unable to send the mail.");
                        return res
                            .status(500)
                            .send({msg: err.message});
                    }
                    res
                        .status(200)
                        .send("Thanks for joining Burpp. Please verify your account.");
                });
            });

        });
});

router.post("/login", (req, res) => {
    Restaurant.findOne({
        email: req.body.email
    }, (err, restaurantUser) => {
        if (!restaurantUser) 
            return res.json({loginSuccess: false, message: "Auth failed, email not found."});
        
        // if (!restaurantUser.isVerified) return res.status(401).send({     type:
        // 'not-verified',     msg: 'Your account has not been verified.' });
        restaurantUser.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) 
                return res.json({loginSuccess: false, message: "Wrong password."});
            
            restaurantUser.generateToken((err, restaurantUser) => {
                if (err) 
                    return res.status(400).send(err.message);
                res.cookie("w_authExp", restaurantUser.tokenExp);
                res
                    .cookie("w_auth", restaurantUser.token)
                    .status(200)
                    .json({loginSuccess: true, restaurantUserId: restaurantUser._id});
            });
        });
    });
});

router.post("/getrestaurants", (req, res) => {
    Restaurant.findOne({
        _id: req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.json(400).send(err.message);
        if (!restaurant) 
            return res.json({success: false, message: "Auth failed, restaurant not found."});
        let parentid = restaurant.parentID;

        Restaurant
            .find({parentID: parentid, isParent: false})
            .exec((err, restaurants) => {
                if (err) 
                    return res.status(400).send(err);
                res
                    .status(200)
                    .json({success: true, restaurants})
            });
    });
});
router.post("/getDetails", (req, res) => {
    Restaurant.findOne({
        _id: req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.json(400).send(err.message);
        if (!restaurant) 
            return res.json({success: false, message: "Auth failed, restaurant not found."});
        
        res
            .status(200)
            .json({success: true, restaurant})
    });
});

router.post("/getcaterers", (req, res) => {
    Restaurant
        .find()
        .distinct('parentID', function (err, parentids) {
            if (err) 
                return res.status(400).send(err.message);
            res
                .status(200)
                .json({success: true, parentids})
        });
})

router.get("/logout", (req, res) => {
    Restaurant.findOneAndUpdate({
        _id: req.restaurantUser._id
    }, {
        token: "",
        tokenExp: ""
    }, (err, doc) => {
        if (err) 
            return res.json({success: false, err: err.message});
        return res
            .status(200)
            .send({success: true});
    });
});

router.post("/delete", (req, res) => {
    Restaurant.findOne({
        _id: req.body.restaurantId
    }, (err, restaurant) => {
        if (err) 
            return res.json({success: false, err: err.message});
        if (!restaurant) {
            return res
                .status(400)
                .json({msg: "No restaurant found"});
        }
        console.log(restaurant._id == restaurant.parentID);
        console.log(restaurant._id);
        console.log(restaurant.parentID);
        if (restaurant._id == restaurant.parentID) {
            return res.json({success: false, msg: "You cannot remove your parent branch."});
        }
        Restaurant.findByIdAndDelete(req.body.restaurantId, (err, docs) => {
            if (err) 
                return res.json({success: false, err: err.message});
            res
                .status(200)
                .json({msg: "Restaurant deleted successfully."})
        })
    })

})

router.post("/open", (req, res) => {

    Restaurant.findOneAndUpdate({
        "_id": req.body._id
    }, {
        $set: {
            status: true
        }
    }, {
        new: true
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        res
            .status(200)
            .json({success: true, restaurant})
    });
});

router.post("/close", (req, res) => {

    Restaurant.findOneAndUpdate({
        "_id": req.body._id
    }, {
        $set: {
            status: false
        }
    }, {
        new: true
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        res
            .status(200)
            .json({success: true, restaurant})
    });
    // if (restaurant) {     restaurant.status = false     restaurant.exec((err,
    // restaurant) => {         if (err) return res.status(400).send(err.messagge)
    //     res.status(200).json({ success: true, restaurant})     }) }
});
router.post("/addImage", (req, res) => {
    const url = req.body.url;
    Restaurant.findByIdAndUpdate({
        _id: req.body._id
    }, {
        $push: {
            images: url
        }
    }, {
        "new": true
    }, (err, restaurant) => {
        if (err) 
            return res.json(400).send(err.message);
        let parentid = restaurant.parentID;
        if (restaurant.parentID != req.body._id) {
            Restaurant.findByIdAndUpdate({
                _id: parentid
            }, {
                $push: {
                    images: url
                }
            }).exec((err, restaurants) => {
                if (err) 
                    return res.status(400).send(err);

                }
            );
        }
        res
            .status(200)
            .json({success: true, restaurant})
    });
});

router.post("/bussinessInsights", (req, res) => {

    Restaurant.findOne({
        "_id": req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        var totalMealsSaved = 0
        restaurant
            .orderHistory
            .forEach((order) => {
                totalMealsSaved = totalMealsSaved + order
                    .foodItems
                    .foodItemQtys
                    .reduce((a, b) => a + b, 0)
            })
        res
            .status(200)
            .json({success: true, totalMealsSaved})
    });

    Restaurant.findOne({
        "_id": req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        var dates = []
        restaurant
            .orderHistory
            .forEach((order) => {
                dates.push(order.created)
            })
        function getWeekDates() {

            let now = new Date();
            let dayOfWeek = now.getDay(); //0-6
            let numDay = now.getDate();

            let start = new Date(now); //copy
            start.setDate(numDay - dayOfWeek);
            start.setHours(0, 0, 0, 0);

            let end = new Date(now); //copy
            end.setDate(numDay + (7 - dayOfWeek));
            end.setHours(0, 0, 0, 0);

            return [start, end];
        }
        function filterDatesByCurrentWeek(dates) {
            let [start,
                end] = getWeekDates();
            return dates.filter(d => + d >= + start && + d < + end);
        }
        var filteredDates = new Array(filterDatesByCurrentWeek(dates))
        var saleThisWeek = 0
        filteredDates.forEach((date) => {
            Order.findOne({
                restaurantID: req.body._id,
                created: date
            }, (err, order) => {
                if (err) 
                    return res.json(400).send(err);
                saleThisWeek = saleThisWeek + order.total
            })
        })
        res
            .status(200)
            .json({success: true, saleThisWeek})
    });

    Restaurant.findOne({
        "_id": req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        var dates = []
        restaurant
            .orderHistory
            .forEach((order) => {
                dates.push(order.created)
            })
        function getTodayDates() {

            let now = new Date();
            let today = now.getDay();
            let numDay = now.getDate();

            let start = new Date(now); //copy
            start.setDate(numDay - today);
            start.setHours(0, 0, 0, 0);

            let end = new Date(now); //copy
            end.setDate(numDay + (1 - today));
            end.setHours(0, 0, 0, 0);

            return [start, end];
        }
        function filterDatesByToday(dates) {
            let [start,
                end] = getTodayDates();
            return dates.filter(d => + d >= + start && + d < + end);
        }
        var filteredDates = new Array(filterDatesByToday(dates))
        var saleToday = 0
        filteredDates.forEach((date) => {
            Order.findOne({
                restaurantID: req.body._id,
                created: date
            }, (err, order) => {
                if (err) 
                    return res.json(400).send(err);
                saleToday = saleToday + order.total
            })
        })
        res
            .status(200)
            .json({success: true, saleToday})
    });

    Restaurant.findOne({
        "_id": req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        var dates = []
        restaurant
            .orderHistory
            .forEach((order) => {
                dates.push(order.created)
            })
        function getMonthDates() {

            let now = new Date();
            let dayOfMonth = now.getDay();
            let numDay = now.getDate();

            let start = new Date(now); //copy
            start.setDate(numDay - dayOfMonth);
            start.setHours(0, 0, 0, 0);

            let end = new Date(now); //copy
            end.setDate(numDay + (30 - dayOfMonth));
            end.setHours(0, 0, 0, 0);

            return [start, end];
        }
        function filterDatesByCurrentMonth(dates) {
            let [start,
                end] = getMonthDates();
            return dates.filter(d => + d >= + start && + d < + end);
        }
        var filteredDates = new Array(filterDatesByCurrentMonth(dates))
        var saleThisMonth = 0
        filteredDates.forEach((date) => {
            Order.findOne({
                restaurantID: req.body._id,
                created: date
            }, (err, order) => {
                if (err) 
                    return res.json(400).send(err);
                saleThisMonth = saleThisMonth + order.total
            })
        })
        res
            .status(200)
            .json({success: true, saleThisMonth})
    });

    Restaurant.findOne({
        "_id": req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        var totalSale = 0
        restaurant
            .orderHistory
            .forEach((order) => {
                totalSale = totalSale + order.total
            })
        var idx = parseInt((totalSale - 20) / 10);
        idx = Math.min(idx, restaurant.commissionRate.length - 1);
        var commission;
        if (idx == -1) 
            commission = 0;
        else 
            commission = restaurant.commissionRate[idx] * totalSale;
        
        var profit = totalSale - commission
        res
            .status(200)
            .json({success: true, totalSale, commission, profit})
    });

});

router.post("/bussinessInsightsTotal", (req, res) => {

    Restaurant.findOne({
        "_id": req.body._id
    }, (err, restaurant) => {
        if (err) 
            return res.status(400).send(err)
        var totalMealsSaved = 0
        restaurant
            .orderHistory
            .forEach((order) => {
                totalMealsSaved = totalMealsSaved + order
                    .foodItems
                    .foodItemQtys
                    .reduce((a, b) => a + b, 0)
            })
        res
            .status(200)
            .json({success: true, totalMealsSaved})
    });

    Restaurant.find({
        "parentID": req.body._id
    }, (err, restaurants) => {
        if (err) 
            return res.status(400).send(err)
        var dates = []
        var saleThisWeek = 0
        restaurants.forEach((restaurant) => {
            restaurant
                .orderHistory
                .forEach((order) => {
                    dates.push(order.created)
                })

            function getWeekDates() {

                let now = new Date();
                let dayOfWeek = now.getDay(); //0-6
                let numDay = now.getDate();

                let start = new Date(now); //copy
                start.setDate(numDay - dayOfWeek);
                start.setHours(0, 0, 0, 0);

                let end = new Date(now); //copy
                end.setDate(numDay + (7 - dayOfWeek));
                end.setHours(0, 0, 0, 0);

                return [start, end];
            }
            function filterDatesByCurrentWeek(dates) {
                let [start,
                    end] = getWeekDates();
                return dates.filter(d => + d >= + start && + d < + end);
            }
            var filteredDates = new Array(filterDatesByCurrentWeek(dates))

            filteredDates.forEach((date) => {
                Order.findOne({
                    restaurantID: restaurant._id,
                    created: date
                }, (err, order) => {
                    if (err) 
                        return res.json(400).send(err);
                    saleThisWeek = saleThisWeek + order.total
                })
            })

        });
        res
            .status(200)
            .json({success: true, saleThisWeek})
    });
    Restaurant.find({
        "parentID": req.body._id
    }, (err, restaurants) => {
        if (err) 
            return res.status(400).send(err)
        var dates = []
        var saleToday = 0
        restaurants.forEach((restaurant) => {
            restaurant
                .orderHistory
                .forEach((order) => {
                    dates.push(order.created)
                })
            function getTodayDates() {

                let now = new Date();
                let today = now.getDay();
                let numDay = now.getDate();

                let start = new Date(now); //copy
                start.setDate(numDay - today);
                start.setHours(0, 0, 0, 0);

                let end = new Date(now); //copy
                end.setDate(numDay + (1 - today));
                end.setHours(0, 0, 0, 0);

                return [start, end];
            }
            function filterDatesByToday(dates) {
                let [start,
                    end] = getTodayDates();
                return dates.filter(d => + d >= + start && + d < + end);
            }
            var filteredDates = new Array(filterDatesByToday(dates))

            filteredDates.forEach((date) => {
                Order.findOne({
                    restaurantID: restaurant._id,
                    created: date
                }, (err, order) => {
                    if (err) 
                        return res.json(400).send(err);
                    saleToday = saleToday + order.total
                })
            })

        });
        res
            .status(200)
            .json({success: true, saleToday})
    });

    Restaurant.find({
        "parentID": req.body._id
    }, (err, restaurants) => {
        if (err) 
            return res.status(400).send(err)
        var dates = []
        var saleThisMonth = 0
        restaurants.forEach((restaurant) => {
            restaurant
                .orderHistory
                .forEach((order) => {
                    dates.push(order.created)
                })
            function getMonthDates() {

                let now = new Date();
                let dayOfMonth = now.getDay();
                let numDay = now.getDate();

                let start = new Date(now); //copy
                start.setDate(numDay - dayOfMonth);
                start.setHours(0, 0, 0, 0);

                let end = new Date(now); //copy
                end.setDate(numDay + (30 - dayOfMonth));
                end.setHours(0, 0, 0, 0);

                return [start, end];
            }
            function filterDatesByCurrentMonth(dates) {
                let [start,
                    end] = getMonthDates();
                return dates.filter(d => + d >= + start && + d < + end);
            }
            var filteredDates = new Array(filterDatesByCurrentMonth(dates))

            filteredDates.forEach((date) => {
                Order.findOne({
                    restaurantID: req.body._id,
                    created: date
                }, (err, order) => {
                    if (err) 
                        return res.json(400).send(err);
                    saleThisMonth = saleThisMonth + order.total
                })
            })
        });
        res
            .status(200)
            .json({success: true, saleThisMonth})

    });

    Restaurant.find({
        "parentID": req.body._id
    }, (err, restaurants) => {
        if (err) 
            return res.status(400).send(err)
        var totalSale = 0
        var profit = 0
        restaurants.forEach((restaurant) => {
            restaurant
                .orderHistory
                .forEach((order) => {
                    totalSale = totalSale + order.total
                })
            if (totalSale == 20) 
                var commission = 20
            if (totalSale == 30) 
                var commission = 22.5
            if (totalSale == 40) 
                var commission = 25
            if (totalSale == 50) 
                var commission = 27.5
            else 
                var commission = 0.5 * totalSale
            profit = totalSale - commission
        });
        res
            .status(200)
            .json({success: true, totalSale, commission, profit})
    });

});
router.get("/search", (req, res) => {
    Restaurant
        .find({isParent: false})
        .exec((err, restaurants) => {
            if (err) 
                return res.status(400).send(err);
            
            res
                .status(200)
                .json({success: true, restaurants})
        });
})

module.exports = router;