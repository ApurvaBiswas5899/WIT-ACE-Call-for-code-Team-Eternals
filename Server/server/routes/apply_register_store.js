const router = require('express').Router();
let ApplyRegisterStore = require('../models/apply_register_store');

router.route('/').get((req, res) => {
    ApplyRegisterStore.find()
        .then(applyRegisterStore => res.status(200).json({success: true, applyRegisterStore}))
        .catch(err => res.status(400).json({success: false, error: err}));
});  

router.route('/add').post((req, res) => {
    const owner = req.body.owner;
    const business_name = req.body.business_name;
    const mobile = Number(req.body.mobile);
    const mail = req.body.mail;
    const stage = req.body.stage;

    const newApplyRegisterStore = new ApplyRegisterStore({
        owner, 
        business_name,
        mobile,
        mail,
        stage,
    });

    newApplyRegisterStore.save()
        .then(() => res.status(200).json({success: true}))
        .catch(err => res.status(400).json({success: false, error: err}));
});

router.route('/:id').get((req, res) => {
    ApplyRegisterStore.findById(req.params.id)
        .then(applyRegistrationStore => res.status(200).json({success: true, applyRegistrationStore}))
        .catch(err => res.status(400).json({success:true, error: err}));
});
 
router.route('/:id').delete((req, res) => {
    ApplyRegisterStore.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({success: true}))
        .catch(err => res.status(400).json({success: false, error: err}));
});

router.route('/update/:id').post((req, res) => {
    ApplyRegisterStore.findById(req.params.id)
        .then(applyRegisterStore => {
            applyRegisterStore.owner = req.body.owner;
            applyRegisterStore.business_name = req.body.business_name;
            applyRegisterStore.mobile = Number(req.body.mobile);
            applyRegisterStore.mail = req.body.mail;
            applyRegisterStore.stage = req.body.stage;

            applyRegisterStore.save()
            .then(() => res.status(200).json({success: true}))
            .catch(err => res.status(400).json({success: false, error: err}));
        })
        .catch(err => res.status(400).json({success: false, error: err}));
});

module.exports = router;