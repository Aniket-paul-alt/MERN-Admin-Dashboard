const validate = (schema) => async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error) {
        const status = 422
        const message = 'Fill the input properly'
        const extraDetails = error.errors[0].message

        const err = {
            status,
            message,
            extraDetails
        }

        console.log(err);
        next(err)
        
        // res.status(400).json({msg: message})


    }
}

module.exports = validate