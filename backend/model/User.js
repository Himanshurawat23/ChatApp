const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
       username:{
        type:String,
        trim:true,
        required:true
       },
       email:{
        type:String,
        trim:true,
        unique:true,
        required:true
       },
       password:{
        type:String,
        required:true
       },
       image: {
        type: String,
        required: true,
    },
       
},{timestamps:true})

let User=mongoose.model('User',userSchema)

module.exports=User