var express = require('express');
var router = express.Router();

//Get games List
router.get('/gameList', ensureAuthenticated, function(req, res){
    res.render('gameList', {user: req.user });
});



//ensure authenticated for other pages - redirects to login and warning
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error','You are not logged in');
        res.redirect('/users/login');
    }
}


module.exports = router;