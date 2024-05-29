const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    monthlyPrice: {
        type: Number,
        required: true
    },
    yearlyPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    monthlyPostJobs: {
        type: Number,
        required: true
    },
    yearlyPostJobs: {
        type: Number,
        required: false
    },
    trialDays: {
        type: Number,
        required: false
    }
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
