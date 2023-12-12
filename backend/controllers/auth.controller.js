const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js")
const nodemailer = require("nodemailer");
require("dotenv").config();


const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExistsAlready = await User.findOne({ email }); //user es un mongoose schema
        if (userExistsAlready) {
            return res.status(400).json(["email already exists"]);
        }
        const passHash = await bcrypt.hash(password, 10); //aquesta funcio encripta el password
        const user = new User({ username, email, password: passHash });
        const userSaved = await user.save();
        const token = await createAccessToken({ id: userSaved._id }); //creció token
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username,
            createdAt: userSaved.createdAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(400).json(["email not found"]);
        }
        const matchPassword = await bcrypt.compare(password, userFound.password);
        if (!matchPassword) {
            return res.status(400).json(["incorrect password"]);
        }
        const token = await createAccessToken({ id: userFound._id }); //creció token
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }); //esborrem la cookie
    return res.status(200).send("OK"); //no cal posar res.json perque no retornem res
};

const profile = async (req, res) => {
    const userFound = await User.findById(req.user.payload.id);
    if (!userFound) {
        return res.status(400).json({ message: "user not found" });
    }
    res.json({
        id: userFound._id,
        email: userFound.email,
        username: userFound.username,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}

const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const userId = decoded.payload.id;
        const userFound = await User.findById(userId);
        if (!userFound) {
            return res.status(401).json({ message: "User not found" });
        }
        return res.status(200).json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    });
}

const forgotPassword = async (req, res) => {
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
}

function sendEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
            secure: true,
            port: 465,
        });

        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: "CE FINA PASSWORD RECOVERY",
            html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color:#faafe7;text-decoration:none;font-weight:600">CE FINA</a>
      </div>
      <p style="font-size:1.1em">Hola!,</p>
      <p>Gracias por elegir CE FINA. Usa el siguiente OTP para completar tu cambio de contraseña. El OTP es valido en los siguientes 5 minutos</p>
      <h2 style="background: #faafe7;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Saludos,<br />CE FINA</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Fina Garcia Inc</p>
        <p>Camí Tovots</p>
        <p>Barcelona - Manresa</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
        };
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent succesfuly" });
        });
    });
}

const changePassword = async (req, res) => {
    const { password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email }); //user es un mongoose schema
    try {
        if (user) {
            await User.updateOne(
                {
                    _id: user.id,
                },
                {
                    $set: { password: hashedPassword }
                });
                console.log('Password updated successfully');
        } else {
            return res.status(400).json(["email not exists"]);
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json(["error while changing password"]);
    }
    return res.status(200).json(["password updated"]);
}

module.exports = { register, login, logout, profile, verifyToken, forgotPassword, changePassword };