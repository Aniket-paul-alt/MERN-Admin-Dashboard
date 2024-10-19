//express.Router
//-------------------------

//In Express.js, express.Router() is a mini Express application without all the server configurations but with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.

//* https://expressjs.com/en/guide/routing.html

//Use the express.Router class to create modular, mountable route handlers. A router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

const express = require("express")
// const { home, register } = require("../controllers/auth-controller")
const authControllers = require("../controllers/auth-controller")
const {signupSchema, signinSchema} = require("../validators/auth-validator")
const validate = require("../middlewares/validator-middleware")
const authMiddleware = require("../middlewares/auth-middleware")
const router = express.Router()

//one way
// router.get("/",(req,res)=>{
//     res.status(200).send("This is authorized page")
// })

//2nd way
// router.route("/").get((req,res)=>{
//     res.status(200).send("This is authorized page")
// })

//using controllers
// router.route("/").get(home)
router.route("/").get(authControllers.home)

// router.route("/register").get(authControllers.register)
router.route("/register").post( validate(signupSchema), authControllers.register)

//login route
router.route("/login").post(validate(signinSchema), authControllers.login)

//user get route
router.route("/user").get(authMiddleware, authControllers.user)

module.exports = router