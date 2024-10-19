require("dotenv").config() // essential line for using dotenv
const cors = require("cors")
const express = require('express')
const authRoute = require('./router/auth-router')
const contactRoute = require('./router/contact-router')
const serviceRoute = require("./router/service-router")
const adminRoute = require("./router/admin-router")
const connectDB = require('./utils/db')
const errorMiddleware = require("./middlewares/error-middleware")
const app = express()
const PORT = 5000

// handle cors policy
let corsOptions = {
    origin: `http://localhost:5173`,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD", 
    credentials: true
}

app.use(cors(corsOptions))

//This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this beefore any routes that need to handle JSON data from requests, and it should be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.
app.use(express.json())

//Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)
app.use("/api/data", serviceRoute)

//admin route
app.use("/api/admin", adminRoute)

//error middleware define here for tell the application there is a error middleware exists
app.use(errorMiddleware)

// app.get("/",(req,res)=>{
//     res.status(200).send("Hi this is mern with thapa bhai")
// })

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at port : ${PORT}`);
    })
})