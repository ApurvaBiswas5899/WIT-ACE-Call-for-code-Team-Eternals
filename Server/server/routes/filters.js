const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Restaurant } = require("../models/Restaurant");

router.post("/getRestaurants", (req, res) => {

    //  const restaurant = new Array(temp.aggregate([
    //      { 
    //          $geoNear: 
    //          { near: {type: 'Point', 
    //              coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]},
    //              spherical: true, maxDistance: 30000, distanceField: "dist.calculated",
    //              includeLocs: "dist.location" 
    //           }
    //      }]))
//         let restaurants = []
//         restaurant.forEach((r) => {
//             if ( r.status == req.body.status && r.category == req.body.category )
//                 restaurants.push(r)
           Restaurant.find({ status: req.body.status, category: req.body.category,isParent:false}, (err, restaurant) => {
               if (err) return res.status(400).send(err.message)
               if (req.body.rating == 1) {
                    var restaurants = _.sortBy(restaurant, 'rating').reverse();
                    res.status(200).json({ "success": true, restaurants })
                }
                else {
                    var restaurants = _.sortBy(restaurant, 'rating');
                    res.status(200).json({ "success": true, restaurants })
                }
           })
//         })
//         

});
       

module.exports = router;



//  .find({ "status": req.body.filter.status, "rating": { "$gte" : req.body.filter.rating }})
//          .exec((err, result)=>{
//          if(err) return res.status(400).json({success: false, err: err.message})
//          res.status(200).json({ success: true, result })
//        })