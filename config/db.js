const mongoose  = require( "mongoose");

require('dotenv').config()
console.log(process.env.MONGODB_URI);
const MONGO_URI = process.env.MONGODB_URI;
const connectDB = async() => {
  try{
    await mongoose.connect(MONGO_URI);
    console.log('Mongodb connected.')
  }catch(err){
    console.log("Mongodb not connected: ", err.message);
  }
} 

module.exports = connectDB;