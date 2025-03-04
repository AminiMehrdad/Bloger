const express = require('express');
const router = express.Router();
const Users = require("../../database/models/users");
const Article = require("../../database/models/articles");
const { valdate_regester, valdate_login } = require("../../utils/validation/Joi_validator");
const { isUsernameUnique, isPhoneNumberUnique } = require("../../utils/validation/data_base_check")
const generaltools = require("../../utils/generalTools");

router.get("/login", (req, res) => {
  if(req.session.user && req.cookies.user_sid) {
     return res.redirect("/auth/dashbord")
  }
  const msg = req.query.msg
  res.render("Login_page", { msg });
})

router.get("/regester", (req, res) => {
  if(req.session.user && req.cookies.user_sid) {
    return res.redirect("/auth/dashbord")
 }
  const msg = req.query.msg
  res.render("regester_page", { msg });
})

router.get("/dashbord", async(req, res) => {
  try {
    if(!req.session.user || !req.cookies.user_sid){
      return res.redirect("/auth/login");
    };
    // 5 ferst Article 
    const articles = await Article.find({creator : req.session.user._id})
    .sort({NumberSee: -1, Title: 1})
    .limit(5)
    // .skip(offset)
    .populate('creator');

    const total_articles = await Article.find({creator : req.session.user._id});
    const num_offsets = Math.ceil(total_articles.length/5)

    const totallikes = await generaltools.sumqury(Article, "$Like", req);
    const totallview = await generaltools.sumqury(Article, "$NumberSee", req);
    const totalldislike = await generaltools.sumqury(Article, "$Dislike", req);

    console.log(articles.Like);
    
    const msg = req.query.msg
    const {FerstName, LastName, UserName, PhoneNumber, Gender, Rol, Avatar} = req.session.user;
    res.render("Dashbord_page", {num_offsets, totallikes, totallview, totalldislike, FerstName, LastName, UserName, PhoneNumber, Gender, Rol, Avatar, msg, articles});
    
  } catch (error) {
    res.render("error")
  }
})

router.post("/create", valdate_regester, async (req, res) => {

  try {
    const isusername = await isUsernameUnique(req.body.UserName);
    const isphonenumber = await isPhoneNumberUnique(req.body.PhoneNumber);
    if (isusername.msg === "No User Find" && isphonenumber.msg === "No User Find") {
      req.body.Rol = "bloger"
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

    const isMathc = user.copearpassword(req.body.PassWord);
    
    if (!user.msg && isMathc){
      req.session.user = user;
      if(req.session.user.Rol === "admin"){
        return res.redirect('/admin/')
      }
      return res.redirect('/auth/dashbord')
    }
    return res.redirect(`/auth/login/?msg=user name or password incorrect`)
    
  } catch (error) {
    console.error("internaral errorr => ", error);
    throw error
  }


})
module.exports = router;
