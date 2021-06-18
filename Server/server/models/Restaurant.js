const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
//geoSchema 
const geoSchema = mongoose.Schema({
    type :{
        type : String,
        default : "Point"
    },
    coordinates :{
        type : [Number],
        index : "2dsphere"
    }
})
const restaurantSchema = mongoose.Schema({
    parentID:{
        type: String,
        default: "first"
    },
    isParent:{
        type:Boolean,
        default: false,
    },
    restaurantName: {
        type:String,
        maxlength:50
    },
    Pincode: {
        type: Number
    },
    Address: {
        type: String,
        maxlength: 50 
    },
    description: {
        type:String,
        maxlength: 50
    },
    images : {
        type:Array,
        default: [] 
    },
    category : {
        type: Number,
        default:0
    },
    rating : {
        type: Number,
        default:4
    },
    status : {
        type: Boolean,
        default:false
    },
    orders :{
        type: Number,
        default: 0
    },
    orderHistory :{
        type: Array,
        default: []
    },
    Reviews:{
        type: Array,
        default: []
    },
    dist :{
        calcualated :{
            type : Number,
        },
    },
    contactNo:{
        type: String,
        maxlength: 20
    },
    geometry :  geoSchema
    ,
    staffName: {
        type:String,
        maxlength:50
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
        maxlength: 50
    },
    tokenExp :{
        type: Number
    },
    isVerified: {
        type: Boolean, 
        default: false 
   },
   token : {
    type: String,
   },
   totalScore: {
       type: Number,
       default: 0
   },
   totalReviews: {
       type: Number,
       default: 0
   },
   latitude : {
    type: String,
   },
   longitude : {
    type: String,
   },
   commissionRate : {
       type: Array,
       default:[]
   }
},{timestamps:true})
restaurantSchema.pre('save', function( next ) {
    var restaurant = this;
    if(restaurant.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err.message);
            bcrypt.hash(restaurant.password, salt, function(err, hash){
                if(err) return next(err.message);
                restaurant.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});
restaurantSchema.pre('save', function( next ) {
    if(this.parentID==="first"){
    this.parentID = this.get('_id'); 
    this.isParent = true;
    }
    next();
});
restaurantSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err.message);
        cb(null, isMatch)
    })
}
restaurantSchema.methods.generateToken = function(cb) {
    var restaurant = this;
    console.log('restaurant',restaurant)
    console.log('restaurantSchema', restaurantSchema)
    var token =  jwt.sign(restaurant._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();
    restaurant.tokenExp = oneHour;
    restaurant.token = token;
    restaurant.save(function (err, restaurant){
        if(err) return cb(err)
        cb(null, restaurant);
    })
}
restaurantSchema.statics.findByToken = function (token, cb) {
    var restaurant = this;
    jwt.verify(token,'secret',function(err, decode){
        restaurant.findOne({"_id":decode, "token":token}, function(err, restaurant){
            if(err) return cb(err);
            cb(null, restaurant);
        })
    })
}
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = { Restaurant }
