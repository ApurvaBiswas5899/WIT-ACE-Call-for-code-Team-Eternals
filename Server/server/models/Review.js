const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {

    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurantID:{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    heading:{
      type: String,
    },
    comment: { type: String,
               required: true
             },
    rating: { type: Number,
              required: true
            },
    images: {
        type: Array,
        default: []
    }
    },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review }
