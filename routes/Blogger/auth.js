const express = require('express');
const router = express.Router();
const Users = require("../../database/models/users");
const valdate_input = require("../../utils/validation/Joi_validator");

router.get("/login", (req, res)=> {
  res.render("Login_page");
})

router.get("/regester", (req, res)=> {
  // const massage = 
  res.render("regester_page");
})

router.post("/dashbord", (req, res) => {
  const {UserName, password} = req.body;
  res.render("Dashbord_page");
})

router.post("/create", valdate_input, async (req, res) => {
  
  try {
    return res.json({msg: "yes"});

    if(!req.body.FerstName || !req.body.LastName || !req.body.UserName || !req.body.PassWord || !req.body.PhoneNumber) {
      return res.redirect("/regester");
    };
  
    const User_username = await Users.findOne({UserName: req.body.UserName.trim()});
    const User_phonenumber = await Users.findOne({PhoneNumber: req.body.PhoneNumber.trim()});
  
    if(User_username) {
      return res.redirect("/login")
    }
    if(User_phonenumber) {
      return res.redirect("/login")
    }

    const NEW_USER = new Users(req.body);

    await NEW_USER.save();
    res.redirect("/login")
    
  } catch (error) {
    console.error("internaral errorr => ", error);
  }
})

router.post("/finduser", async (req, res) => {
  try {
    if (!req.body.UserName || !req.body.PassWord) {
      return res.render('login', {msg: 'Not Acceptable'})
  };
  const user = Users.findOne({UserName: req.body.UserName})
  if (!user) {
    return res.render('login', {msg: 'Wrong username or password'})
}
req.session.user = user;

        res.redirect('/api/auth/dashboard')
  } catch (error) {
    console.error("internaral errorr => ", error);
  }
 

})
module.exports = router;
