import { db } from "../server.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = (req, res) => {
    
    //check if user already exist
    const userExistsQuery = "SELECT * FROM users WHERE  email = ? OR username = ?";
    db.query(userExistsQuery, [req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");

        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //create user 
        const insertUserQuery = "INSERT INTO users SET ?";
        const values = {
            username: req.body.username, 
            email: req.body.email,
            password: hash
        };
        db.query(insertUserQuery, values, err => {
            if(err) return res.json(err);
            res.status(200).json("User created successfully");
        });
    });

}

export const login = (req, res) => {

    //check if username exist
    const usernameExistQuery = "SELECT * FROM users WHERE username = ?";

    db.query(usernameExistQuery, [req.body.username], (err, data) => {

        //throw error if username is not found
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Incorrect Username / Password");

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(404).json("Incorrect Username / Password");

        //create token and store in cookie
        const token = jwt.sign({id: data[0].id}, process.env.SECRET);
        const {password, ...other} = data[0];
        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" }).status(200).json({...other});
    });
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none", secure: true
    }).status(200).json("You've been logged out");
}