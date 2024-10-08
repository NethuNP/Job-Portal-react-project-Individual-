const mongoose = require('mongoose');
const {roles}=require('../utils/constants');
const Schema = mongoose.Schema;

const RegSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    confirmPassword: { 
        type: String,
        required: false
    },   
    role: {
        type: String,
        enum: ["admin", "seeker",],
        default: roles.seeker,
        required: true
    }
   
});

const Reg = mongoose.model("Reg", RegSchema);

module.exports = Reg;
