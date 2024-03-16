import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const userSignUp = async(req, res) => {
    try {
        let verificationURL;
        const exist = await User.findOne({username: req.body.username})
        if(exist) {
            return res.status(401).json({message: "Username already exist"})
        }
        const user = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({...user, password: hashedPassword, verified: false});
        await newUser.save();
        
        //sending verification mail
        jwt.sign({username: newUser.username}, process.env.EMAIL_SECRET_KEY, { expiresIn: '1hr'}, (err, token) => {
            if(err) throw err;

            verificationURL=`http://localhost:8000/verify/${token}`;
            transporter.sendMail({
                from: process.env.AUTH_EMAIL,
                to: user.email,
                subject: "Verify Your Email",
                html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 1hour </b>.</p><p>Click <a href=${verificationURL}>${verificationURL}</a> to proceed.</p>`
            }).then(()=>{
                console.log("Email sent successfully")
            }).catch(error => {
                console.log(error)
            })
        })
        res.status(200).json({message: user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const verifyEmail = async(req, res) => {
    try {
        const emailToken = req.params.token;
        if(emailToken) {
            jwt.verify(emailToken, process.env.EMAIL_SECRET_KEY, {}, async (err, user) => {
                if(err) {
                    res.status(500).json({message: "Verification link is expired"})
                }
                const existedUser = await User.findOne({username:user.username})
                if(existedUser) {
                    existedUser.verified = true;
                    await existedUser.save();
                    res.sendFile(path.join(__dirname, '../views/verified.html'));
                } else {
                    res.status(500).json({message: "User is not verified"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

export const userLogin = async(req, res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;

        let user  = await User.findOne({username: username});
        if(!user) {
            return res.status(401).json('Invalid credentials')
        }
        if(!user.verified) {
            return res.status(500).json({message: "Verify email address"})
        }
        const isValidPassword = bcrypt.compare(password, user.password)
        if(!isValidPassword) {
            return res.status(401).json("invalid credentials")
        }
        jwt.sign({userId: res._id}, process.env.SECRET_KEY, {expiresIn: '1hr'}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax'
            }).json({user})
            return res.status(200).json({user})
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const verifyToken = (req, res) => {
    try {
        const {token} = req.cookies;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY, {}, (err,user) => {
                if(err) throw err;
                return res.status(200).json(user)
            })
        }
        else {
            return res.status(200).json(null)
        }
        
    } catch (error) {
        res.status(500).json(null)
    }
}