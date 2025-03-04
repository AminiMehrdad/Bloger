const express = require('express');
const router = express.Router();
const Users = require("../../database/models/users");
const Article = require("../../database/models/articles");
const generaltools = require("../../utils/generalTools");
const fs = require("fs")
const path = require("path")
const {valdate_article} = require("../../utils/validation/Joi_validator");
const {isTextUnique, isTitleUnique} = require("../..//utils/validation/data_base_check");
const { log } = require('console');

// Loug Out User
// ==================================================================
router.get("/logout", (req, res) => {
    res.clearCookie("user_sid")
    res.redirect("/auth/login")
})
// ==================================================================

// Update User
// ==================================================================
router.put("/profile", async(req, res) => {
    const  id  = req.session.user._id;
    const { FerstName, LastName, UserName, Password, PhoneNumber, Gender } = req.body;
    const update_user = await Users.findByIdAndUpdate(id, { FerstName, LastName, UserName, Password, PhoneNumber, Gender }) ;  
    res.json(update_user);
})
// ==================================================================

// Delete User
// ==================================================================
router.delete("/profile", async(req, res) => {  
    const  id  = req.session.user._id;
    const delete_user = await Users.findByIdAndDelete(id);
    res.json(delete_user);
})
// ==================================================================

// Uplog Avatar
// ==================================================================
router.post("/uplodavatar", async(req, res)=> {
    
    
    const upload = generaltools.upload.single("avatar");
    upload(req, res, async function (err) {
        try{
            if (err) {
                return res.status(500).json({msg: err})
            } 
            const id = req.session.user._id  
            const Avatar = "/images/userimages/" + req.file.filename
            await Users.findByIdAndUpdate(id, { Avatar });
            if(!(req.session.user.Avatar === "/images/images.png")) {
                fs.unlinkSync(path.join(__dirname, "../../public" + req.session.user.Avatar))
            }
            req.session.user.Avatar = Avatar;
            // fs.unlinkSync(filePath);
            res.redirect("/auth/dashbord")
        }catch {
            res.status(400).json({msg: "something went wrong"})
        }  
      })
})
// ==================================================================

// Uplot Article
// ==================================================================
router.post("/uploadArticle", valdate_article, async(req, res) => {
    try {
        const isTitle = await isTitleUnique(req.body.Title);
        const isText = await isTextUnique(req.body.Text);
        if (isTitle.msg === "No User Find" && isText.msg === "No User Find") {
            req.body.creator = req.session.user._id
            const {Title, Text, CreateAt, Categury, creator} = req.body
            const NEW_USER = new Article({Title, Text, CreateAt, Categury, creator});
            const savearticle = await NEW_USER.save();
            // console.log(await Article.findById(savearticle._id).populate('creator'));
            // console.log(await Article.find())
            
            return res.status(201).redirect(`/auth/dashbord/?msg=<div id="custom-alert" class="alert alert-success" role="alert">Successfuly Add Article</div>`)
        };
        if (!isTitle.msg) {
            return res.redirect(`/auth/dashbord/?msg=<div id="custom-alert" class="alert alert-danger" role="alert">There is some article with this Titel</div>`)
        };
        if (!isText.msg) {
            return res.redirect(`/auth/dashbord/?msg=<div id="custom-alert" class="alert alert-danger" role="alert">There is some article with this Text</div>`)
        };
        
        
    } catch (error) {
        console.error("internaral errorr => ", error);
        throw error
    }

})
// ==================================================================

// change page
// ==================================================================
router.get("/offset/:page",async (req, res) => {
    const page = parseInt(req.params.page);

    const articles = await Article.find({creator : req.session.user._id})
        .sort({NumberSee: -1, Title: 1})
        .skip(5*(page-1))
        .limit(5)
        .populate('creator');

    res.send(articles)
});

// get articles
// ==================================================================
router.get("/allarticles/:page", async(req, res) => {
    const page = parseInt(req.params.page);

    const artces = await Article.find({})
    .sort({NumberSee:-1, Title: 1})
    .skip(5*(page-1))
    .limit(12)
    .populate("creator");

    res.send(artces)

});
router.get("/offsetartels", async(req, res) => {
    const artces = await Article.find()
    const num_pages = Math.ceil(artces.length/12)
    res.send(num_pages)
})
module.exports = router;