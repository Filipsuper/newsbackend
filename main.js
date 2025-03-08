import { configDotenv } from "dotenv";
import mongoose, { mongo, set } from "mongoose"
import express from "express";
import cors from "cors";
import auth from "./routes/auth.js"
import user from "./routes/user.js"
import data from "./routes/data.js"
import mail from "./routes/mail.js"

const app = express();
configDotenv()
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

//allow origin 
app.use(cors())

const MODE = process.env.MODE

console.log("MODE", MODE)

const MONGOURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGODB}`;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use("/api/auth", auth)
app.use("/api/user", user)
app.use("/api/data", data)
app.use("/api/mail", mail)



app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGOURI, { dbName: "morningsum" });
        // Connect to MongoDB
        console.log("MongoDB connection successful");
        console.log(`Trademaxxer listening on port ${PORT}`);
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }

});