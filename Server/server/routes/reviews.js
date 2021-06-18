const express = require('express');
const router = express.Router();
const { Review } = require("../models/Review");
const { Restaurant } = require("../models/Restaurant");
const { auth } = require("../middleware/auth");

//=================================
//           Review
//=================================

// From frontend route is ./api/review/saveReview
 router.post("/saveReview", (req, res) => {

     // saving review in MongoDB
    const review = new Review(req.body)

    review.save((err, review) => {
        if (err) return res.json({ success: false, err })

        Review.findOne({ '_id': review._id })
        // getting user's info
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                Restaurant.findOne({ _id: result.restaurantID }, (err, restaurant) => {
                    if(err) return res.json(400).send(err);
                    var r1 = restaurant.totalScore + result.rating
                    var r2 = restaurant.totalReviews + 1
                    var r3 = r1 / r2
                    Restaurant.findOneAndUpdate({ "_id": restaurant._id },{$set:{rating:r3}},{new: true}, (err, result) => {
                        if (err) return res.status(400).send(err)
                    });
                    Restaurant.findOneAndUpdate({ "_id": restaurant._id },{$set:{totalScore:r1}},{new: true}, (err, result) => {
                        if (err) return res.status(400).send(err)
                    });
                    Restaurant.findOneAndUpdate({ "_id": restaurant._id },{$set:{totalReviews:r2}},{new: true}, (err, result) => {
                        if (err) return res.status(400).send(err)
                    });
                });
                
                return res.status(200).json({ success: true, result })
            })
    
     })
 });

// route is ./api/review/getReview

router.post("/getReview", (req, res) => {
     
    // find restaurant from restaurantID and show its reviews it will be recieved from frontend.
    Review.find({ "restaurantID": req.body.restaurantID })
        .populate('writer')
        .exec((err, reviews) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, reviews })
        })

});

// reviews using userID

router.post("/getReview/user/:userID",auth, (req, res) => {
     
    Review.find({ "writer": req.body.userID })
        .populate('restaurantID')
        .exec((err, reviews) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, reviews })
        })

});

// review by user and restaurant
router.post('/getreviews/restaurant/:restaurantID/user/:userID',auth, (req, res) => {
    const restaurant =  Review.find({ "restaurantID": req.body.restaurantID });
    if (restaurant) {
      Review.find({ "writer": req.body.userID, "restaurantID": req.body.restaurantID})
      .exec((err, reviews) => {
          if (err) return res.status(400).send(err)
          res.status(200).json({ success: true, reviews })
      })
    } 
  }
);

module.exports = router;
