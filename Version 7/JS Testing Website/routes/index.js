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
//Ensure authenticated to access homepage - no warning because first accessing website
function ensureAuthenticatedHome(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error','You are not logged in');
        res.redirect('/users/guestHome');
    }
}
//Get User Profile
router.get('/users/profile', ensureAuthenticated, function(req, res){
    res.render('profile', {user: req.user });
});
//Get Mutation Testing info page
router.get('/mutationTesting', function(req, res){
    res.render('mutationTesting', {user: req.user });
});

router.get('/basicManual', function(req, res){
    res.render('basicManual', {user: req.user });
});

router.get('/mutManual', function(req, res){
    res.render('mutManual', {user: req.user });
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