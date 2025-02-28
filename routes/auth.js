import mongoose from "mongoose";
import express from "express"
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";

// use env file in ../
configDotenv();

const router = express.Router()
const JWT_KEY = process.env.JWT_KEY
console.log(JWT_KEY)

router.post("/add", async (req, res) => {
    try {
        const { email, password, default_size, default_stop, default_target, secretkey } =
            req.body;

        if (secretkey != process.env.SECRET_KEY) {
            return res.status(400).json({ error: "Invalid secret key", message: "Invalid secret key", success: false });
        }

        const existingUser = await User.findOne({ username: { $eq: email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already taken", message: "Email already in use!", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: email,
            password: hashedPassword,
            default_size: default_size,
            default_stop: default_stop,
            default_target: default_target,
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Registration failed", message: error.message, success: false });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // find user by username
        const existingUser = await User.findOne({ username: { $eq: username } });
        if (!existingUser) {
            return res.status(404).json({ error: "Invalid Credentials" });
        }
        const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const payload = {
            username: existingUser.username,
            user_id: existingUser._id,
        };

        const token = jwt.sign(payload, JWT_KEY, {
            expiresIn: "24h",
        });

        res.status(200).json({ access_token: token, success: true });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Login failed", success: false });
    }
});

export default router