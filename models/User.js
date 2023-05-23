const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

   // "name":"guneshh munjal",
    //"email":"guneshmunjal096@gmail.com",
   // "password":"abcdd",
    //"role":"customer"

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["customers","sellers"],
    }
});



module.exports = mongoose.model("user",userSchema);