const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        min:2,
        max:30
    },
    type:{
        type:String,
        enum:['ADMIN','OTHER'],
        default:'OTHER'
    },
    lname:{
        type:String,
        min:2,
        max:30
    },
    password:{
        type:String,
        min:2,
        max:30
    },
})
module.exports.userSchema=mongoose.model("users",userSchema);