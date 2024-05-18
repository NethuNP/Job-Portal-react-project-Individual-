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
        required: true
    },
    confirmPassword: { 
        type: String,
        required: true
    },   
    roles: {
        type: String,
        enum: [roles.admin,roles.employer, roles.user, roles.seeker],
        default: roles.user,
        required: true
    }
   
});

const Reg = mongoose.model("Reg", RegSchema);

module.exports = Reg;
