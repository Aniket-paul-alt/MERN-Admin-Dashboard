const Service = require("../models/service-model")

const services = async( req, res )=>{
    try {
        const response = await Service.find()
        if(!response) {
            res.status(404).json({msg: "No Services Found"})
            return
        }
        res.status(200).json({response})
        
    } catch (error) {
        console.error("Services Error: ",error);
        
    }
}

module.exports = services