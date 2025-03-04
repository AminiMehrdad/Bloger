const Joi = require("joi");

const RegesterSchema = Joi.object({
    FerstName: Joi.string()
        .trim()
        .empty()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': `FerstName should be a type of 'text'`,
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name cannot exceed 50 characters",
            "any.required": "Name is required"
        }),

    LastName: Joi.string()
        .trim()
        .empty()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': `LastName should be a type of 'text'`,
            "string.min": "LastName must be at least 3 characters long",
            "string.mxn": "LastName cannot exceed 50 characters",
            "any.required": "LastName is required"
        }),

    UserName: Joi.string()
        .trim()
        .empty()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': `UserName should be a type of 'text'`,
            "string.min": "UserName must be at least 3 characters long",
            "string.max": "UserName cannot exceed 50 characters",
            "any.required": "Usernmae is required",
            "any.invalid": `UserName is not invalid`
        }),

    PassWord: Joi.string()
        .trim()
        .empty()
        .min(4)
        .max(20)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,20}$'))
        .messages({
            'string.base': `PasWord should be a type of 'text'`,
            "string.min": "PassWord must be at least 4 characters long",
            "string.max": "PassWord cannot exceed 20 characters",
            "any.required": "PassWord is required",
            'string.pattern.base': 'PassWord must contain only letters, numbers',
        }),

    PhoneNumber: Joi.string()
        .trim()
        .empty()
        .required()
        .messages({
            'string.base': `PhoneNumber should be a type of 'text'`,
            "any.required": "PhoneNumber is required",
            "any.invalid": `This phone number is not valid`
        }),
    Gender: Joi.string()

});

const LoginSchema = Joi.object({
    UserName: Joi.string()
        .trim()
        .empty()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': `UserName should be a type of 'text'`,
            "string.min": "UserName must be at least 3 characters long",
            "string.max": "UserName cannot exceed 50 characters",
            "any.required": "Usernmae is required"
        }),

    PassWord: Joi.string()
        .trim()
        .empty()
        .min(4)
        .max(20)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,20}$'))
        .messages({
            'string.base': `PasWord should be a type of 'text'`,
            "string.min": "PassWord must be at least 4 characters long",
            "string.max": "PassWord cannot exceed 20 characters",
            "any.required": "PassWord is required",
            'string.pattern.base': 'PassWord must contain only letters, numbers',
        }),
})

const ArticleSchema = Joi.object({
    Title: Joi.string()
    .trim()
    .empty()
    .min(3)
    .max(20)
    .required()
    .messages({
        "string.base": "Title should be type of text",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title cannot exceed 20 characters",
        "any.required": "Title is required",

    }),

    Text: Joi.string()
    .trim()
    .empty()
    .min(10)
    .required()
    .messages({
        "string.base": "Text should be type of text",
        "string.min": "Text must be at least 10 characters long",
        "any.required": "Text is required",

    }),
})

module.exports = {RegesterSchema, LoginSchema, ArticleSchema};

