
import express from "express"
import { authenticateToken } from "../utils/utils.js";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { Article } from "../models/article.js";
import { Mail } from "../models/mail.js";
import { createContact } from "../utils/resend.js";

// use env file in ../
configDotenv();

const router = express.Router();

router.get("/unsubscribe", async (req, res) => {
    const { mail } = req.query
    console.log(mail)
    try {
        if (!mail) {
            return res.status(400).json({ error: "No mail provided" })
        }

        const res = await Mail.deleteOne({ mail })

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove mail user" });
    }

})

// USER LOGIC
router.post("/", async (req, res) => {
    try {
        const { mail } = req.body;

        if (!mail) {
            return res.status(400).json({ error: "Skriv in en mail" });
        }

        const check = await Mail.exists({ mail })
        if (check) {
            return res.status(400).json({ error: "Mail taken", msg: "Mailen är redan tagen" })
        }

        const newMail = new Mail({ mail });

        await newMail.save();

        createContact({ email: mail })

        res.status(200).json({ msg: "Added mail" });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to add mail user" });
    }
});






export default router;