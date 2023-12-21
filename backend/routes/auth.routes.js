const express = require('express');
const { login, register, logout, profile, verifyToken, forgotPassword, changePassword, changeImage, updateprofile } = require('../controllers/auth.controller.js');
const { authRequired } = require('../middlewares/validateToken.js');
const { loginSchema, registerSchema } = require('../schemas/auth.schema.js');
const { validateSchema } = require('../middlewares/validator.middleware.js');
const multer = require('multer')
const path = require('path')

const router = express.Router()

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.get('/logout', logout);

router.get('/profile', authRequired, profile);

router.get('/auth/verify', verifyToken);

router.post('/forgotPassword', forgotPassword);

router.post('/changePassword', changePassword);

//STORE IMAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {     
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const uplaod = multer({
    storage: storage
})

router.post('/changeImage', uplaod.single('file'), changeImage);

router.post('/updateProfile', updateprofile);



module.exports = router;