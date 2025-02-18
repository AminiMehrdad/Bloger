function access(user_acess){
    function accessControl(req, res, next) {
        console.log(req.session.user);
        
        if (!user_acess.includes(req.session.user.Rol)) {
            res.redirect('/admin/');
        }
        return next()
    }

}




module.exports = {accessControl, useroradmin};