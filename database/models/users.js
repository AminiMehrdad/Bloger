const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    FerstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    PassWord: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    Gender: {
        type: String,
        enum: ["other", "female", "male"],
        default: "male"
    },
    Rol: {
        type: String,
        enum: ["admin", "bloger"],
        default: "bloger"
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    Active: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model("User", UserSchema);