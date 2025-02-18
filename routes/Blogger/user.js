const express = require('express');
const router = express.Router();
const Users = require("../../database/models/users");

router.get("/logout", (req, res) => {
    res.clearCookie("user_sid")
    res.redirect("/auth/login")
})

router.put("/profile", async(req, res) => {
    const  id  = req.session.user._id;
    
    
    const { FerstName, LastName, UserName, Password, PhoneNumber, Gender } = req.body;
    const update_user = await Users.findByIdAndUpdate(id, { FerstName, LastName, UserName, Password, PhoneNumber, Gender }) ;  
    res.json(update_user);
})

router.delete("/profile", async(req, res) => {  
    const  id  = req.session.user._id;
    const delete_user = await Users.findByIdAndDelete(id);
    res.json(delete_user);
})

module.exports = router;