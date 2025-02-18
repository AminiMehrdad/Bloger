const express = require('express');
const router = express.Router();
const auth = require('./Blogger/auth');
const users = require("./Blogger/user");
const admin = require("./Admin/admin");

// Middleware to check access
function access(user_acess) {
    return function accessControl(req, res, next) {
        // Check if user is logged in
        
        
        if (!req.session.user || !req.cookies.user_sid) {
            console.log(req.method); 
            if (req.method === 'GET') {
                return res.redirect("/auth/login");
            }
            // Return 401 for non-GET requests
            return res.status(401).json({ msg: 'Unauthorized. Please log in.' });
        }
        // Check if user has the required role
        if (!user_acess.includes(req.session.user.Rol)) {
            return res.status(403).send('Access is denied!');
        }
        next();
    };
}


// Routes
router.use("/auth", auth); // Authentication routes (e.g., login, logout)
router.use("/user", users); // User routes
router.use("/admin", access(["admin"]), admin); // Admin routes (restricted to "admin" role)

module.exports = router;
