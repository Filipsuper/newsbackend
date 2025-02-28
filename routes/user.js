import mongoose from "mongoose";
import express from "express"
import jwt from "jsonwebtoken";
import { authenticateToken } from "../utils/utils.js"
import { configDotenv } from "dotenv";

// use env file in ../
configDotenv();

const router = express.Router()

// USER LOGIC
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { username } = req.auth;

        // find user
        const userData = await User.findOne({
            username
        }, { password: 0, _id: 0 });

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

export default router