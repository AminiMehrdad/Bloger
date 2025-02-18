const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "Title is required"],
        unique: [true, "UserName shold be unique"],
        validate: {
            validator: function(titel) {
                return titel && title.length > 3;
            },
            message: `Title must be at least 4 characters long`
        }
    },
    Text: {
        type: String,
        required: [true, "text is required"],
        unique: [true, "text mostbe unique"],
        validate: {
            validator: function(text) {
                return text && text.length > 10;
            },
            massage: "Text must be at least 11 characters long"
        }
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    NumberSee: {
        type: Number,
        default: 0
    },
    ID_creator: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Article", ArticleSchema);