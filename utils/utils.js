
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const JWT_KEY = process.env.JWT_KEY;

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_KEY, async (err, user) => {
        if (err) return res.sendStatus(403);
        req.auth = { username: user.username, user_id: user.user_id };
        next();
    });
};