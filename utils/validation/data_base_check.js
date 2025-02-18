const User = require("../../database/models/users");
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
module.exports = {
    isUsernameUnique,
    isPhoneNumberUnique
};