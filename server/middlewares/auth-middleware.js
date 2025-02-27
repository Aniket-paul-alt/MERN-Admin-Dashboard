const jwt = require('jsonwebtoken')
const User = require("../models/user-model")

const authMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({mesaage: "Unauthorized HTTP, Token not provided"})
    }

    // console.log(token);

    const jwtToken = token.replace("Bearer","").trim()
    // console.log(jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        console.log(isVerified);

        // getting the complete user details & also we don't want password to be sent
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
  
        req.token = token;
        req.user = userData;
        req.userID = userData._id;
        
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    
    
}

module.exports = authMiddleware