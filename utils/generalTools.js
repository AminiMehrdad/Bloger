const multer = require("multer");
const path = require("path");
const generaltools = {};
const Users = require("../database/models/users");

generaltools.AccessContorol = function (user_acess) {
    return function accessControl(req, res, next) {
        // Check if user is logged in


        if (!req.session.user || !req.cookies.user_sid) {
            if (req.method === 'GET') {
                return res.redirect("/auth/login");
            }
            // Return 401 for non-GET requests
            const message = "Time Login is Over please login again";
            const error = {
                status: 403,
                stack:` <a style="font-size: 24px;" href="http://localhost:5000/auth/login">Login Page</a>`
            } 
            return res.render("error",{ message, error });
        }
        // Check if user has the required rolehttp://
        if (!user_acess.includes(req.session.user.Rol)) {
            return res.status(403).send('Access is denied!');
        }
        next();
    };
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/userimages'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}` + '-' + `${Math.round(Math.random() * 9)}`
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

generaltools.upload = multer({
    storage: storage,
    fileFilter: async function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                return cb('invalid type!', false)
            }
            cb(null, true)
    }
})

generaltools.sumqury = async function(db, parameter, req) {
    const result = await db.aggregate([
        // Match documents created by the specific user
        { $match: { creator: req.session.user._id } },
        // Group all documents and calculate the sum of the `likes` field
        { 
            $group: {
                _id: null, // Group all documents into a single group
                total: { $sum: parameter } // Sum the `likes` field
            }
        }
    ]);
    
    // Extract the total likes from the result
    const total = result.length > 0 ? result[0].totalLikes : 0;
    return total
}

module.exports = generaltools;