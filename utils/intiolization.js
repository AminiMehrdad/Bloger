const User = require("../database/models/users");

const AdminiCreate = async ()=> {
  

  try {
        const adminFerstname = process.env.adminFerstname
        const adminLastname = process.env.adminLastname
        const adminUsername = process.env.adminUsername
        const adminPassword = process.env.adminPassword
        const adminPhonenumber = process.env.adminPhonenumber
        const adminRol = process.env.adminRol

        const exisitinadmin = await User.findOne({Rol:"admin"});

        if(!!exisitinadmin) return console.log("Admin already created ):");

        const Admin = new User({
            FerstName:process.env.adminFerstname, 
            LastName:process.env.adminLastname,
            UserName:process.env.adminUsername,
            PassWord:process.env.adminPassword,
            PhoneNumber:process.env.adminPhonenumber,
            Rol:process.env.adminRol
        });

        await Admin.save();
        console.log("Admin Create secessfull (:")

  } catch(erorr){
        console.error('Error creating admin user:', erorr);
  }
}

module.exports = AdminiCreate