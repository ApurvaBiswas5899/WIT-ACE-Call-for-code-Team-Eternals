const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new mongoose.Schema(
  {
    description:{
        type: String,   
    },
    name :{
      type :String,
    },
    user:{
      type:Schema.Types.ObjectId,
      ref: 'User'
    },
    restaurantID:{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    price: { 
        type: Number,
        required: true
    },
   qty: {
     type: Number,
     default: 1
   },
   images: {
     type: Array,
     default: []
   }
  });

const Food_item = mongoose.model('Food_item', foodItemSchema);

module.exports = { Food_item }
