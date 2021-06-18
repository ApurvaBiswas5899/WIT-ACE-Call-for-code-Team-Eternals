const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CareerSchema = new Schema({
    first_name: {
        type:String,
        maxlength:50
    },
    last_name: {
        type:String,
        maxlength:50
    },
    contactNo: {
        type : String,
        maxlength: 20
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    question1: {
        type:String,
        maxlength:500
    },
    question2:{
        type:String,
        maxlength:500
    },
    question3:{
        type:String,
        maxlength:500
    },
    question4:{
        type:String,
        maxlength:500
    },
    cv:{
        type: String,
    }

}, {
    timestamps: true,
});

const Career = mongoose.model('Career', CareerSchema);

module.exports = Career;