const mongoose = require('mongoose');
require('dotenv').config();

const URL =process.env.MONGO_URL;

const connectDB = async()=>{
    try{
        await mongoose.connect(URL).then(()=>console.log("db connected"));
    }
    catch(err){
        console.error(err);
    }
}

module.exports = connectDB;
