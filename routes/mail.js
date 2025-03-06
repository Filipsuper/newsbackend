
import express from "express"
import { authenticateToken } from "../utils/utils.js";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { Article } from "../models/article.js";
import { Mail } from "../models/mail.js";

// use env file in ../
configDotenv();

const router = express.Router();

// USER LOGIC
router.post("/", async (req, res) => {
    console.log("ADDING MAIL")
    try {
        const { mail } = req.body;

        console.log("MAIL:", req.body)

        if (!mail) {
            return res.status(400).json({ error: "Skriv in en mail" });
        }

        const check = await Mail.exists({ mail })
        if (check) {
            return res.status(400).json({ error: "Mail taken", msg: "Mailen är redan tagen" })
        }

        const newMail = new Mail({ mail });

        await newMail.save();


        res.status(200).json();
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to add mail user" });
    }
});



export default router;