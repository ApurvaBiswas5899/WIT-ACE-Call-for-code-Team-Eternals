const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema2 = new mongoose.Schema(
    {
    _restaurantUserId: { 
        type:Schema.Types.ObjectId, 
        required: true,
        ref: 'Restaurant' 
        },
    token: {
         type: String, 
         required: true 
        },
    createdAt: { 
        type: Date,
         required: true, 
         default: Date.now, 
         expires: 43200 
        }
}
);
const Token2 = mongoose.model('Token2', tokenSchema2);

module.exports = { Token2 }