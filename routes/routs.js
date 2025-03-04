const express = require('express');
const router = express.Router();
const auth = require('./Blogger/auth');
const users = require("./Blogger/user");
const admin = require("./Admin/admin");
const GenerallTools = require("../utils/generalTools");


router.use("/auth", auth); 
router.use("/user", GenerallTools.AccessContorol(["admin", "bloger"]), users); 
router.use("/admin", GenerallTools.AccessContorol(["admin"]), admin); 

module.exports = router;
