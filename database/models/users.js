const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    FerstName: {
        type: String,
        required: [true, "FerstName is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    LastName: {
        type: String,
        required: [true, "LastName is required"],
        minlength: [3, "LastName must be at least 3 characters long"],
        maxlength: [50, "LastName cannot exceed 50 characters"]
    },
    UserName: {
        type: String,
        required: [true, "UserName is required"],
        unique: [true, "UserName shold be unique"],
        minlength: [3, "UserName must be at least 3 characters long"],
        maxlength: [50, "UserName cannot exceed 50 characters"]
    },
    PassWord: {
        type: String,
        required: [true, "PassWord is required"],
        minlength: [4, "PassWord must be at least 3 characters long"],
        maxlength: [20, "PassWord cannot exceed 20 characters"]
    },
    PhoneNumber: {
        type: String,
        required: [true, "Phone Number is requrie"],
        unique: [true, "PhoneNUmber shold be unique"],
        validate: {
            validator: function(value) {
                return validator.isMobilePhone(value, "fa-IR");
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
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