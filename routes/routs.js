const express = require('express');
const router = express.Router();
const auth = require('./Blogger/auth');
const users = require("./Blogger/user");

// blogger roots
router.use("/auth", auth);
router.use("/user", users);

// Admin roots

module.exports = router;
