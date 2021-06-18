const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applyRegisterStoreSchema = new Schema({
    owner: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    business_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        length: 10,
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    stage: {
        type: Number,
        // 1 : application received
        // 2 : application under review
        // 3 : account details sent
        // 4 : onboarding form under review
        // 5 : eatery valid
        required: true,
    }

}, {
    timestamps: true,
});

const ApplyRegisterStore = mongoose.model('ApplyRegisterStore', applyRegisterStoreSchema);

module.exports = ApplyRegisterStore;