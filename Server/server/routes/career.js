const router = require('express').Router();
let Career = require('../models/career');

router.route('/').get((req, res) => {
    Career.find()
        .then(career => res.status(200).json({success: true, career}))
        .catch(err => res.status(400).json({success: false, error: err}));
});  

router.route('/add').post((req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const contactNo = req.body.contactNo; 
    const email = req.body.email;
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const question3 = req.body.question3;
    const question4 = req.body.question4;
    const cv = req.body.cv;

    const newCareer = new Career({
        first_name,
        last_name,
        contactNo,
        email,
        question1,
        question2,
        question3,
        question4,
        cv
    });

    newCareer.save()
        .then(() => res.status(200).json({success: true}))
        .catch(err => res.status(400).json({success: false, error: err}));
});

router.route('/:id').get((req, res) => {
    Career.findById(req.params.id)
        .then(career => res.status(200).json({success: true, career}))
        .catch(err => res.status(400).json({success: false, error: err}));
});
 
router.route('/:id').delete((req, res) => {
    Career.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({success: true}))
        .catch(err => res.status(400).json({success: false, error: err}));
});

module.exports = router;