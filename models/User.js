import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        // hash: { type: String },
        // salt: String,
        password: { type: String, required: true },
        plan: { type: String, required: true },
    },
    { collection: "users" }
);


export const User = mongoose.model("User", UserSchema, "users");
