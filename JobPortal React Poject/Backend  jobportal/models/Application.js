const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    postingDate: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    application: {
        type: String,
        required: true // Path to the uploaded application file
    },
    mimeType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);
