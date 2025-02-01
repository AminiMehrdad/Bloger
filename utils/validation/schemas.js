const Joi = require("joi");
const Validate_User = require("./data_base_check")
const validator = require("validator");

const UserSchema = Joi.object({
    FerstName: Joi.string().min(3).max(50).required()
    .messages({
        "Min Length" : "Name must be at least 3 characters long",
        "Max Length" : "Name cannot exceed 50 characters",
        "any.required" : "Name is required"
    }),
    
    LastName: Joi.string().min(3).max(50).required()
    .messages({
        "Min Length" : "LastName must be at least 3 characters long",
        "Max Length" : "LastName cannot exceed 50 characters",
        "any.required" : "LastName is required"
    }),
    
    UserName: Joi.string().min(3).max(50).required()
    .external(async (value, helpers) => {
        const isUnique = await Validate_User(value);
        if(!isUnique) {
            return helpers.error("any.invalid", {value})
        }
        return value
    }, 'Unique username validation')
    .messages({
        "string.min" : "UserName must be at least 3 characters long",
        "string.max" : "UserName cannot exceed 50 characters",
        "any.required" : "Usernmae is required",
        "any.invalid" : `UserName is not invalid`
    }),

    PassWord: Joi.string().min(4).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]{4,20}$'))
    .messages({
        "string.min" : "PassWord must be at least 4 characters long",
        "string.max" : "PassWord cannot exceed 20 characters",
        "any.required" : "PassWord is required",
        'string.pattern.base': 'PassWord must contain only letters, numbers, and underscores',
    }),
    
    PhoneNumber: Joi.string().required().external(async (value, helpers) => {
        const isTherPhoneNumber = await Validate_User(value);
        if(!isTherPhoneNumber) {
            return helpers.error("any.invalid", {value})
        }

        const validator_phone = validator.isMobilePhone(value, "fa-IR");
        if(!validator_phone) {
            return helpers.error("any.invalid", {value});
        }

        return value
    },'Unique username validation')
    .messages({
        "any.required" : "PhoneNumber is required",
        "any.invalid" : `This phone number is not valid`
    })
    
});

module.exports = UserSchema;

