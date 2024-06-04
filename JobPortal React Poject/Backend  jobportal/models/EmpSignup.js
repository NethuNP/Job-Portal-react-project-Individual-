const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const Schema = mongoose.Schema;

const EmpRegSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    businessOwner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactno: {
        type: String,  // Changed to String to avoid leading zeros issue
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    selectedPlan: {
        type: Schema.Types.ObjectId,
        ref: "Plan", // Reference to the Plan model
      },
   role: {
        type: String,
        enum: ["admin", "seeker", "employer"],
        default: roles.employer,
        required: true
    }
});

const EmpReg = mongoose.model("EmpReg", EmpRegSchema);

module.exports = EmpReg;
