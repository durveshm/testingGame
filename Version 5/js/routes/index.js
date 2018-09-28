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

router.get('/users/scenarioList', ensureAuthenticated, function(req, res){
    res.render('scenarioList', {user: req.user });
});

router.get('/users/scenarioA0', ensureAuthenticated, function(req, res){
    res.render('scenarioA0', {user: req.user });
});

router.get('/users/profile', ensureAuthenticated, function(req, res){
    res.render('profile', {user: req.user });
});

router.get('/users/mutationTesting', function(req, res){
    res.render('mutationTesting', {user: req.user });
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