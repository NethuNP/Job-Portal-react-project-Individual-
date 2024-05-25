const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    
});

const Fedback =mongoose.model ("Fedback",FeedbackSchema);
module.exports=Fedback;