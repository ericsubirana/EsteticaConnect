const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const {createAccessToken} = require("../libs/jwt.js");

const register = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const passHash = await bcrypt.hash(password, 10); //aquesta funcio encripta el password
        const user = new User({username, email, password: passHash});
        const userSaved = await user.save();
        const token = await createAccessToken({id: userSaved._id}); //creció token
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username,
            createdAt: userSaved.createdAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email})
        if (!userFound) {
            return res.status(400).json({message: "email not found"});
        }
        const matchPassword = await bcrypt.compare(password, userFound.password);
        if (!matchPassword) {
            return res.status(400).json({message: "incorrect password"});
        }
        const token = await createAccessToken({id: userFound._id}); //creció token
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const logout = async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)}); //esborrem la cookie
    return res.status(200).send("OK"); //no cal posar res.json perque no retornem res
};

const profile = async (req,res) => {
    const userFound = await User.findById(req.user.payload.id);
    if(!userFound){
        return res.status(400).json({message: "user not found"});
    }
    res.json({
        id: userFound._id,
        email: userFound.email,
        username: userFound.username,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}


module.exports = { register, login, logout, profile };