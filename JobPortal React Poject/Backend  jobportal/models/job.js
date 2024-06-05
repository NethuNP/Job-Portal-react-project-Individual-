const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    email:{
        type: Schema.Types.ObjectId, // Assuming empId is a reference to EmpRegSchema
        ref: "EmpReg" 
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
        required: false
    },
    minPrice: {
        type: String,
        required: true
    },
    maxPrice: {
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
    expireryDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required:true
    },
    jobCategory: {
        type: String,
        required:true // or true if it's required
    },
    employmentType: {
        type: String,
        required:false // or true if it's required
    },
    status: {
        type: String,
        
    }
    
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
