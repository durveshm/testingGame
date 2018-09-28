var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Rexercise = require('../models/rexercises');
var Interrexercise = require('../models/interRexercises');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');



//Get scenarios List
router.get('/scenarioList', ensureAuthenticated, function(req, res){
    res.render('MutantGames/scenarioList', {user: req.user });
});
//Get all Scenarios
//Scenario 1
router.get('/scenarioE0', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioE0', {exercises: docs });
    });
});
router.get('/scenarioE1', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioE1', {exercises: docs });
    });
});
router.get('/scenarioE2', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioE2', {exercises: docs });
    });
});
router.get('/scenarioE3', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioE3', {exercises: docs });
    });
});
router.get('/scenarioE4', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioE4', {exercises: docs });
    });
});
//Scenario 2
router.get('/scenarioF0', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioF0', {exercises: docs });
    });
});
router.get('/scenarioF1', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioF1', {exercises: docs });
    });
});
router.get('/scenarioF2', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioF2', {exercises: docs });
    });
});
router.get('/scenarioF3', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioF3', {exercises: docs });
    });
});
router.get('/scenarioF4', ensureAuthenticated, function(req, res){
    Rexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioF4', {exercises: docs });
    });
});

//INTERMEDIATE
router.get('/scenarioG0', ensureAuthenticated, function(req, res){
    Interrexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioG0', {exercises: docs });
    });
});
router.get('/scenarioG1', ensureAuthenticated, function(req, res){
    Interrexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioG1', {exercises: docs });
    });
});
router.get('/scenarioG2', ensureAuthenticated, function(req, res){
    Interrexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioG2', {exercises: docs });
    });
});
router.get('/scenarioG3', ensureAuthenticated, function(req, res){
    Interrexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioG3', {exercises: docs });
    });
});
router.get('/scenarioG4', ensureAuthenticated, function(req, res){
    Interrexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('MutantGames/scenarioG4', {exercises: docs });
    });
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