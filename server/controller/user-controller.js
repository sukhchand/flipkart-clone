import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

const SECRET_KEY = "secretkey"

export const userSignUp = async(req, res) => {
    try {

        const exist = await User.findOne({username: req.body.username})
        if(exist) {
            return res.status(401).json({message: "Username already exist"})
        }
        const user = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({...user, password: hashedPassword});
        await newUser.save();
        res.status(200).json({message: user})
    } catch (error) {
        res.status(500).json({message: error.message})
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
        const isValidPassword = bcrypt.compare(password, user.password)
        if(!isValidPassword) {
            return res.status(401).json("invalid credentials")
        }
        jwt.sign({userId: res._id}, SECRET_KEY, {expiresIn: '1hr'}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json({user})
            return res.status(200).json({user})
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}