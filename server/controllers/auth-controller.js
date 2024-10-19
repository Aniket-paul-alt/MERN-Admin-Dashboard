//controllers

// In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typcally used to process incoming requests, interact with models(data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

//Home Logic

const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const home = async (req,res) =>{
    try {
        res.status(200).send("This is Home in auth page")
    } catch (error) {
        console.log(error);
        // res.status(400).
    }
}

//Registration Logic

const register = async (req,res)=>{
    try {
        // console.log(req.body);
        const { username, email, password, phone} = req.body

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message: "email already registered"})
        }

        const userCreated = await User.create({username,email,password,phone})

        res.status(201).json({msg: "Successfully registered", token: await userCreated.generateToken(), userId: userCreated._id.toString()})
    } catch (error) {
        console.log(error);
        // res.status(500).json({msg: "Internal error"})
        next(error)
    }
}

//Login Logic

const login = async(req,res)=>{
    try {
        const { email, password} = req.body;

        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(401).json({message: "Invalid credentials"})
        }

        // const user = await bcrypt.compare(password, userExist.password)
        const user = await userExist.comparePassword(password)

        if(user){
            res.status(200).json({ msg:"Login Successfull", token: await userExist.generateToken(), userId: userExist._id.toString()})
        }
        else{
            res.status(401).json({ msg: "Invalid email and password"})
        }

    } catch (error) {
        // console.log(error);
        // res.status(500).json({msg: "Server error"})
        next(error)
    }
}

//get user data - user logic

const user = async(req, res)=>{
    try {
        // res.status(200).json({msg:"hii user hii"})
        const userData = req.user
        console.log(userData);
        return res.status(200).json({userData})
    } catch (error) {
        console.log("error from user route "+ error);
        
    }
}

module.exports = { home , register, login, user }