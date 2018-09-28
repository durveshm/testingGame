var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



//Get scenarios List
router.get('/scenarioList', ensureAuthenticated, function(req, res){
    res.render('scenarioList', {user: req.user });
});
//Get all Scenarios
//Scenario 1
router.get('/scenarioA0', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioA0', {user: req.user });
});
router.get('/scenarioA1', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioA1', {user: req.user });
});
router.get('/scenarioA2', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioA2', {user: req.user });
});
router.get('/scenarioA3', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioA3', {user: req.user });
});
router.get('/scenarioA4', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioA4', {user: req.user });
});
//Scenario 2
router.get('/scenarioB0', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioB0', {user: req.user });
});
router.get('/scenarioB1', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioB1', {user: req.user });
});
router.get('/scenarioB2', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioB2', {user: req.user });
});
router.get('/scenarioB3', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioB3', {user: req.user });
});
router.get('/scenarioB4', ensureAuthenticated, function(req, res){
    res.render('scenarios/scenarioB4', {user: req.user });
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