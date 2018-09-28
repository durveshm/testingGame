var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Get Homepage
router.get('/', ensureAuthenticatedHome, function(req, res){
    //var points = req.user.points;
    //console.log(points);

    res.render('index');
});

function ensureAuthenticatedHome(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error','You are not logged in');
        res.redirect('/users/guestHome');
    }
}

router.get('/users/playGame', ensureAuthenticated, function(req, res){
    res.render('playGame', {user: req.user });
});

router.get('/users/profile', ensureAuthenticated, function(req, res){
    res.render('profile', {user: req.user });
});






function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error','You are not logged in');
        res.redirect('/users/login');
    }
}


module.exports = router;