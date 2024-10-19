const User = require("../models/user-model")
const Contact = require("../models/contact-schema")

//get all users from admin route

const getAllUsers = async(req, res) =>{
    try {
        const users = await User.find({}, {password:0})

        if(!users || users.length === 0){
            return res.status(404).json({message: "No user found"})
        }

        return res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}

//get single user by id in admin panel for edit user

const getUserById= async(req, res, next)=>{
    try {
        const id = req.params.id
        const userData = await User.findOne({_id:id})
        return res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

//user update logic
const updateUserById = async(req,res) =>{
    try {
        const id = req.params.id
        const updatedUserData = req.body

        const updatedData = await User.updateOne({_id:id}, {
            $set: updatedUserData
        })

        return res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}


//delete user by id in admin panel

const deleteUserById= async(req, res)=>{
    try {
        const id = req.params.id
        await User.deleteOne({_id:id})
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        next(error)
    }
}


//get all contacts from admin route

const getAllContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find()

        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "No contact reocrd found"})
        }

        return res.status(200).json(contacts)

    } catch (error) {
        next(error)
    }
}

//delete contact from admin contact route
const deleteContactById= async(req, res)=>{
    try {
        const id = req.params.id
        await Contact.deleteOne({_id:id})
        return res.status(200).json({message: "Contact Message deleted successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById}