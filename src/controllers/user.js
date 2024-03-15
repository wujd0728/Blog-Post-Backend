const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signupUser = async(req, res) => {
    const {username, password} = req.body;

    try {
        const exists = await User.findOne({username});
        if (exists) {
            return res.status(400).json({error: "Username already in use!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username, password: hashedPassword
        });
        return res.status(201).json({newUser});

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const loginUser = async(req, res) => {
    const {username, password} = req.body;

    try {
        const exists = await User.findOne({username});
        if (!exists) {
            return res.status(404).json({error: "Username not found!"})
        };

        const isPasswordMatch = await bcrypt.compare(password, exists.password);

        if (!isPasswordMatch) {
            return res.status(400).json({error: "Incorrect password!"});
        }

        const token = jwt.sign({userId: exists._id}, process.env.JWT_SECRET);

        res.status(200).json({username, token});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    signupUser,
    loginUser
}