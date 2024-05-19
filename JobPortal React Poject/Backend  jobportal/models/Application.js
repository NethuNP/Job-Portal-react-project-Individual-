const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        required: true,
    },
    postingDate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    application: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Application', applicationSchema);
