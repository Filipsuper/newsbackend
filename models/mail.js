import mongoose from "mongoose";

const MailSchema = new mongoose.Schema(
    {
        mail: { type: String, required: true, unique: true },
        subscribed: { type: Boolean, default: true }
    }, { timestamps: true }
);


export const Mail = mongoose.model("Mail", MailSchema, "mails");
