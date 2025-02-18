const {RegesterSchema, LoginSchema} = require("./schemas");

async function valdate_regester(req, res, next) {
  try {
    const { error, value } =  RegesterSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Return validation errors
      return res.status(400).json({msg:`${error.details[0].message}`});
    }
    next();
  } catch (error) {
    console.error('Validation failed:', error);
    return res.status(500).json({ msg: "Internal server error" });
  } 
}

async function valdate_login(req, res, next) {
  try {
    const {error, value} = LoginSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({msg:`${error.details[0].message}`});
    }
    next()
  } catch (error) {
    console.error('Validation failed:', error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {valdate_regester, valdate_login};