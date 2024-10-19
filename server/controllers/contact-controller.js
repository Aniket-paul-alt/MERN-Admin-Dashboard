const Contact = require("../models/contact-schema")

const contactForm = async(req,res)=>{
    try {
        const response = req.body
        await Contact.create(response)
        return res.status(201).json({msg: "message send successfully"})
    } catch (error) {
        return res.status(400).json({msg: "message not delivered"})
    }
}

module.exports = contactForm