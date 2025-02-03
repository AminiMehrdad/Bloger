const express = require('express');
const router = express.Router();
const Users = require("../../database/models/users");
const { valdate_regester, valdate_login } = require("../../utils/validation/Joi_validator");
const { isUsernameUnique, isPhoneNumberUnique } = require("../../utils/validation/data_base_check")

router.get("/login", (req, res) => {
  const msg = req.query.msg
  res.render("Login_page", { msg });
})

router.get("/regester", (req, res) => {
  const msg = req.query.msg
  res.render("regester_page", { msg });
})

router.post("/dashbord", (req, res) => {
  const { UserName, password } = req.body;
  res.render("Dashbord_page");
})

router.post("/create", valdate_regester, async (req, res) => {

  try {
    const isusername = await isUsernameUnique(req.body.UserName);
    const isphonenumber = await isPhoneNumberUnique(req.body.PhoneNumber);
    if (isusername.msg === "No User Find" && isphonenumber.msg === "No User Find") {
      const NEW_USER = new Users(req.body);
      await NEW_USER.save();
      return res.status(201).redirect("/auth/login")
    }
    if (!isusername.msg || !isphonenumber.msg) {
      return res.status(400).redirect(`/auth/regester/?msg="You regester befor with this user name or phone number!"`)
    }
    res.status(400).redirect(`/auth/regester/?msg="${isphonenumber.msg}"`);

  } catch (error) {
    console.error("internaral errorr => ", error);
    throw error
  }
})

router.post("/finduser", valdate_login, async (req, res) => {
  try {

    const user = await isUsernameUnique(req.body.UserName);
    
    if (!user.msg && req.body.PassWord === user.PassWord){
      req.session.user = user;
      res.redirect('/auth/dashboard')
    }
    return res.redirect(`/auth/login/?msg=user name or password incorrect`)
    
  } catch (error) {
    console.error("internaral errorr => ", error);
    throw error
  }


})
module.exports = router;
