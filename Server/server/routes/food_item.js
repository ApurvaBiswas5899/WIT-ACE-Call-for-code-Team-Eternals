const express = require('express');
const router = express.Router();
const { Food_item } = require("../models/Food_item");

const { auth } = require("../middleware/auth");

//Get all the food items sold currently by a restaurant

// Add or remove items by a restaurant


router.post("/getFood_items", (req,res) => {

    //to get all the fooditems currently sold by the restaurant with its id

    Food_item.find({ "restaurantID" : req.body.restaurantID})
        .populate('restaurant')
        .exec((err, food_items) =>{
            if(err) return res.status(400).send(err)
            res.status(200).json({ success : true, food_items})
        })
});

// Add or remove items by a restaurant

router.post("/addFood_item", (req, res) => {

    const food_item = new Food_item(req.body)
    food_item.save((err, food_item) => {
        if (err) return res.json({ success: false, err })

        Food_item.find({ '_id': food_item._id })
        
            .populate('restaurant')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

router.delete("/removeFood_item/:id" ,async (req,res) =>{
    const food_itemid = req.params.id;
    try{
        const result = await Food_item.findByIdAndDelete(food_itemid);
        if(!result)
        {
            res.json({success: false, err:'Item not Found'});
        }
        res.status(200).json({success: true, result});
    }
    catch(error){
        res.status(400).send();
    }
})





module.exports = router;