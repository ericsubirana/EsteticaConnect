const User = require("../models/user.model.js");


const register = (req, res) => {
    const {username, email, password} = req.body;
    try {
        const user = new User({username, email, password});
        user.save();
        res.send("register");
    } catch (error) {
        console.log(error);
    }
}

const login = (req, res) => {
    res.send("login");
};

module.exports = { register, login };