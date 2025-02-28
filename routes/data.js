import express from "express";
import { authenticateToken } from "../utils/utils.js";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

// use env file in ../
configDotenv();

const router = express.Router();

const MONGOURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGODB}`;

// USER LOGIC
router.get("/", async (req, res) => {
    try {
        const db = await mongoose.connect(MONGOURI);
        const collection = db.connection.collection("articles");
        const articleArr = await collection.find({}).sort({ createdAt: -1 }).limit(1).toArray();

        const article = articleArr[0];

        console.log("Article", article);

        res.status(200).json(article);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

export default router;