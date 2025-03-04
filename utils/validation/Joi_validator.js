const {RegesterSchema, LoginSchema, ArticleSchema} = require("./schemas");

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

async function valdate_article(req, res, next) {
  try {
    const parameters = {
      Title: req.body.Title,
      Text: req.body.Text
    }
    const {error, value} = ArticleSchema.validate(parameters, { abortEarly: false })
    if (error) {
      return res.redirect(`/auth/dashbord/?msg=<div id="custom-alert" class="alert alert-danger" role="alert">${error.details[0].message}</div>`)
    }
    next()
  } catch (error) {
    console.error('Validation failed:', error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {valdate_regester, valdate_login, valdate_article};