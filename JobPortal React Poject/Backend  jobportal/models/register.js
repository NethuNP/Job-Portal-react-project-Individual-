const mongoose = require('mongoose');

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
    role:{
        type:String,
        required:true

    }
});

const Reg = mongoose.model("Reg", RegSchema);

module.exports = Reg;
