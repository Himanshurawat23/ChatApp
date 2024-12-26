const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/chattest')
    console.log("Database is connected")
}

module.exports = connectDb