const adminMiddleware = async(req,res,next)=>{
    try {
        // console.log(req.user.isAdmin);
        const isAdmin = req.user.isAdmin
        if(!isAdmin){
            return res.status(403).json({message:"Acces denied, user is not an admin"})
        }
        // res.json({msg: req.user.isAdmin})
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = adminMiddleware