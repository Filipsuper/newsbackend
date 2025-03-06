import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    sentimentLabel: { type: String },
    sentimentScore: { type: Number },
    omxPrice: { type: String },
    omxChange: { type: String },
    omxChangePercentage: { type: String },
    articleCount: { type: Number }
}, { timestamps: true, strict: false });

export const Article = mongoose.model("Article", articleSchema);

