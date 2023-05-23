const mongoose = require("mongoose");

const productsList = new mongoose.Schema({

     name:{
        type:String,
        required:true,
     },
     itemType:{
        type:String,
        required:true,
     },
     price:{
        type:Number,
        required:true,
     },
     description:{
        type:String,
        required:true,
     },
     updatedAt:{
      type:Date,
     }
     

});






module.exports = mongoose.model("product",productsList);