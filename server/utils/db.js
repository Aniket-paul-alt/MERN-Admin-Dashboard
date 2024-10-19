const mongoose = require("mongoose")

// const URI = `mongodb://127.0.0.1:27017/mernThapa`
const URI = process.env.MONGODB_URI


const connectDB = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("DB connected Successfully");
    } catch (error) {
        console.log("DB connection Failed | "+ error);
        process.exit(0)        
    }
}

module.exports = connectDB