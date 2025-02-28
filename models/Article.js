import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true
    },
    sentimentLabel: {
        type: String,
    },
    sentimentScore: {
        type: Number,
    },
    omxPreMarketData: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
});


export const Article = mongoose.model('Article', articleSchema);


