const router = require('express').Router();

const Razorpay = require('razorpay');
let Transaction = require('../models/Transaction.js');

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

require('dotenv').config();
const keyid = process.env.razorpaytest_id;
const keysecret = process.env.razorpaytest_secret;

const crypto = require('crypto');

router.route('/order').post(function (req, res) {
  var instance = new Razorpay({
    key_id: 'rzp_test_wHeKhLFCmgfWbe',
    key_secret: 'sPjOGi5dHKuNtzdDauoB7DND',
  });
  var options = {
    amount: req.body.total * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11',
    payment_capture: 1,
  };

  let razorpay_order_id = '';
  instance.orders.create(options, async function (err, razorOrder) {
    if (err) {
      return res.send(err);
    } else {
      razorpay_order_id = razorOrder.id;

      //creating order
      const order = req.body;

      const session = await mongoose.startSession();
      session.startTransaction();
      // let orderValue = 0;
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
          // orderValue += order.foodItems.foodItemQtys[i] * foodItem.price;
          order.foodItems.foodItemPrices.push(foodItem.price);
          order.foodItems.foodItemNames.push(foodItem.name);
          if (foodItem.images.length !== 0)
            order.foodItems.foodItemImages.push(foodItem.images[0]);
        }
        order.razorpayOrderID = razorpay_order_id; //adding razorpay_order_id
        // order.total = orderValue;
        order.completed = false;
        order.paymentSuccess = 'Pending';
        order.userName = user.name + ' ' + user.lastname;
        const result = await new Order(order).save();
        user.orderHistory.push(result._id);
        await user.save();
        const restaurant = await Restaurant.findOne({
          _id: order.restaurantID,
        });
        restaurant.orderHistory.push(result._id);
        await restaurant.save();

        await session.commitTransaction();
        session.endSession();

        return res
          .status(200)
          .json({ success: true, result, razorpay_order_id });
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        if (err instanceof InvalidRequestError) {
          res.status(400).send({
            success: false,
            error: err.getMessage(),
          });
        } else {
          res
            .status(500)
            .send({ success: false, error: 'Internal server error' });
        }
      }
    }
  });
});

router.route('/payment').post(function (req, res) {
  console.log('body', req.body.payload.payment.entity.order_id);
  Order.findOneAndUpdate(
    { razorpayOrderID: req.body.payload.payment.entity.order_id },
    { $set: { paymentSuccess: 'Completed' } },
    { new: true },
    (err, order) => {
      if (err) return res.status(400).send({ success: false });
      res.status(200).json({ success: true });
    }
  );
  // const generated_signature = crypto.createHmac("sha256", keysecret);
  // generated_signature.update(
  //   req.body.razorpay_order_id + "|" + req.body.transactionid
  // );
  // if (generated_signature.digest("hex") === req.body.razorpay_signature) {
  //   const transaction = new Transaction({
  //     transactionid: req.body.transactionid,
  //     transactionamount: req.body.transactionamount,
  //   });
  //   Order.findOneAndUpdate(
  //     { razorpayOrderID: req.body.payload.payment.entity.order_id },
  //     { $set: { completed: true } },
  //     { new: true }
  //   );
  //   transaction.save(function (err, savedtransac) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send("Some Problem Occured");
  //     }

  //     res.send({ transaction: savedtransac });
  //   });
  //   // return res.send('success');
  // } else {
  //   return res.send("failed");
  // }
});

module.exports = router;
