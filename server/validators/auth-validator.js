const { z } = require("zod")

const signinSchema = z.object({
    email: z
    .string({required_error:"email must required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(5, {message:"email must have atleast 5 letters"})
    .max(20,{message:"email must not exceeds 20 letters"}),
    password: z
    .string({required_error:"password is required"})
    .min(5, {message:"password must have atleast 5 letters"})
    .max(20,{message:"password must not exceeds 20 letters"}),
})

const signupSchema = signinSchema.extend({
    username: z
    .string({required_error:"username is required"})
    .trim()
    .min(3, {message:"username must have atleast 3 letters"})
    .max(15,{message:"username must not exceeds 15 letters"}),
    phone: z
    .string({required_error:"phone is required"})
    .min(10, {message:"phone must have atleast 10 letters"})
    .max(20,{message:"phone must not exceeds 20 letters"}),
})



module.exports = {signupSchema, signinSchema}