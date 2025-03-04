const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "Title is required"],
        unique: [true, "Title shold be unique"],
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [20, "Title cannot exceed 20 characters"]
    },
    Text: {
        type: String,
        required: [true, "text is required"],
        unique: [true, "text mostbe unique"],
        minlength: [10, "Text must be at least 10 characters long"],
    
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    NumberSee: {
        type: Number,
        default: 0
    },
    Like: {
        type: Number,
        default: 0
    },
    Dislike: {
        type: Number,
        default: 0
    },
    Categury: {
        type: String,
        enum: ["Technology", "Health", "Business", "Entertainment"],
        default: "Technology"
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("Article", ArticleSchema);