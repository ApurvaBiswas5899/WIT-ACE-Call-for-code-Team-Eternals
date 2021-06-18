const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  // orderInfo: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Cart'
  // },
  razorpayOrderID: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  restaurantID: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  restaurantName: {
    type: String,
  },
  restaurantImages: {
    type: Array,
    default: [],
  },
  total: {
    type: Number,
    default: 0,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  paymentMode: {
    type: String,
  },
  paymentSuccess: {
    type: String,
  },
  consumedFood: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  foodItems: {
    foodItemIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Food_item',
      },
    ],
    foodItemQtys: {
      type: Array,
      default: [],
    },
    foodItemPrices: {
      type: Array,
      default: [],
    },
    foodItemNames: {
      type: Array,
      default: [],
    },
    foodItemImages: {
      type: Array,
      default: [],
    },
  },
  userName: {
    type: String,
    maxlength: 50,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
