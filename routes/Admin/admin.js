const express = require("express"); 
const router = express.Router();
const Users = require("../../database/models/users");
const { isUsernameUnique, isPhoneNumberUnique } = require("../../utils/validation/data_base_check");

router.get("/", async (req, res) => {
   
    const users = await Users.find({}).select(`-PassWord -__v -CreateAt`);
    res.render("admin", {users});
})



router.put("/",async(req, res) => {
    const user = await Users.findById(req.body.id);
    if(req.body.UserName !== user.UserName) {
        const isusername = await isUsernameUnique(req.body.UserName);
        if(!isusername.msg) {
            return res.json({msg:"UserName userd before"})
        } 
    }

    if(req.body.PhoneNumber !== user.PhoneNumber) {
        const isphonenumber = await isPhoneNumberUnique(req.body.PhoneNumber);        
        if (!isphonenumber.msg) {
            return res.json({msg:"Phone Number Used before"})
        }
    }
    const {FerstName, LastName, UserName, PhoneNumber, Gender} = req.body

    const updateUser = await Users.findByIdAndUpdate(req.body.id, {FerstName, LastName, UserName, PhoneNumber, Gender})
        

   res.json({msg: "OK"})
})

router.delete("/:id", async function(req, res)  {
    try {
        const _id = req.params.id
        await Users.findByIdAndDelete(_id);
        res.json({msg: "OK"});
    } catch (error) {
        console.error("there is some error on delete ==>", error);
        return res.status(400).json({msg: "There is somoe error"});
    }

})

module.exports = router
