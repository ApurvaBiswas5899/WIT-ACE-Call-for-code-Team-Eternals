const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50,
        default:"John"
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type:String,
        maxlength: 50,
        default:"Doe"
    },
    role : {
        type:Number,
        default: 0 
    },
    isVerified: {
         type: Boolean, 
         default: false 
    },
    dateOfBirth: {
        type: String
      },
    gender :{
        type: String
    },
    burppcred:{
        type:Number,
        default: 0
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    },
    orderHistory:{
        type: Array,
        default: []
    },
    Preference:{
        type: Number
    },
    contactNo: {
        type : String,
        maxlength: 20
    },
    refCode: {
        type: String,
    }
})


userSchema.pre('save', function( next ) {
    var user = this;
    this.refCode = this.name[0]+this.lastname[0]+this.contactNo;
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user)
    console.log('userSchema', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }
