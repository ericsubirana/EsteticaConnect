const {z} = require('zod');

const registerSchema = z.object({
    username : z.string({
        required_error: 'Username is required'
    }).min(3, {message: "Usename must be atleast 3 characters"}).max(255),
    email : z.string({
        message: 'Invalid email format'
    }).email({
        message: 'Invalid email'
    }),
    password : z.string({
        required_error: 'Password is required'
    }).min(6,{message: "Password must be atleast 6 characters"}).max(255),
    image : z.string({
        message: 'Invalid image'
    }).optional(),
    description : z.string({
        message: 'Invalid description'
    }).optional(),
    name : z.string({
        message: 'Invalid name'
    }).optional(),
    surname : z.string({
        message: 'Invalid surname'
    }).optional(),
    admin : z.string({
        message: 'No admin'
    }).optional()
})

const loginSchema = z.object({
    email : z.string({
        required_error: 'Email is required'
    }).email({ message: 'Invalid email' }),
    password : z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    }).max(255, {message: 'Password must be at most 255 characters'}),

});


module.exports = {registerSchema, loginSchema};