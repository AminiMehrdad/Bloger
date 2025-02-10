const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

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
UserSchema.pre("save", async function (next)  {
    
    if(!this.isModified("PassWord")) return next();

    try{
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)

        if (isNaN(saltRounds)) {
            throw new Error('SALT_ROUNDS must be a valid number');
          }

          const salt = await bcrypt.genSalt(saltRounds);
          const hashpassword = await bcrypt.hash(this.PassWord, salt);
          this.PassWord = hashpassword

    } catch(error){
        next(error);
    }
})

UserSchema.methods.copearpassword = async function (password) {
    return await bcrypt.compare(password, this.PassWord)
}

module.exports = mongoose.model("User", UserSchema);