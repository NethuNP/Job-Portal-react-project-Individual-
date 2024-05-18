const mongoose = require("mongoose");

const approvedJobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    minPrice: { type: String, required: true },
    maxPrice: { type: String, required: true },
    salaryType: { type: String, required: false },
    jobLocation: { type: String, required: true },
    postingDate: { type: String, required: true },
    expireryDate: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    requiredSkill: { type: String, required: false },
    companyLogo: { type: String, required: false},
    employmentType: { type: String, required: false },
    description: { type: String, required: true },
    postedBy: { type: String, required: true },
    jobCategory: { type: String, required: true }
});

module.exports = mongoose.model("ApprovedJob", approvedJobSchema);
