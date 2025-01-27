const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        unique: true
    },
    Text: {
        type: String,
        required: true,
        unique: true
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    NumberSee: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Article", ArticleSchema);