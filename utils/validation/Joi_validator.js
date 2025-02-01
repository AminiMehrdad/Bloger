const User_Schema = require("./schemas");

function valdate_input(req, res, next) {

    const {error, value} = User_Schema.validateAsync(req.body);

    if (error) {
        // Return validation errors
        return res.status(400).json({
          errors: error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }

    next()
    
};

module.exports = valdate_input