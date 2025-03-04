const User = require("../../database/models/users");
const Article = require("../../database/models/articles");
const validator = require("validator");


async function isUsernameUnique(username) {
    try {
        const user = await User.findOne({ UserName: username }).exec();
        if(!user) {
            return {msg: "No User Find"}
        }
        return user; // Return true if no user is found (unique), false otherwise
    } catch (error) {
        console.error("Error checking user number uniqueness:", error);
        throw error; // Re-throw the error for the caller to handle
    }
    
}

async function isPhoneNumberUnique(phoneNumber) {
    try {
        const validator_phone = validator.isMobilePhone(phoneNumber, "fa-IR");
        if (!validator_phone) {
            return {msg: "Invalid PhoneNumber"}
        }
        const user = await User.findOne({ PhoneNumber: phoneNumber }).exec();
        if(!user) {
            return {msg: "No User Find"}
        }
        return user;
    } catch (error) {
        console.error("Error checking phone number uniqueness:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

async function isTitleUnique(titele) {
    try { 
        console.log(titele)
        const user = await Article.findOne({ Title:titele }).exec();
        if(!user) {
            return {msg: "No User Find"}
        }
        return user;
    } catch (error) {
        console.error("Error checking Title uniqueness:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

async function isTextUnique(Text) {
    try {
        const user = await Article.findOne({ Text: Text }).exec();
        if(!user) {
            return {msg: "No User Find"}
        }
        return user;
    } catch (error) {
        console.error("Error checking Text uniqueness:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

module.exports = {
    isUsernameUnique,
    isPhoneNumberUnique,
    isTitleUnique,
    isTextUnique
};