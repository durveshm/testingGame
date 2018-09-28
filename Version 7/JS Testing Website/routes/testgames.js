var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Exercise = require('../models/exercise');
var Interexercise = require('../models/interexercises');
var Advexercise = require('../models/advexercises');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');



//Get scenarios List
router.get('/scenarioList', ensureAuthenticated, function(req, res){
    res.render('TestGames/scenarioList', {user: req.user });
});
//Get all Scenarios
//Scenario 1
router.get('/scenarioA0', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioA0', {exercises: docs });
    });
});
router.get('/scenarioA1', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioA1', {exercises: docs });
    });
});
router.get('/scenarioA2', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioA2', {exercises: docs });
    });
});
router.get('/scenarioA3', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioA3', {exercises: docs });
    });
});
router.get('/scenarioA4', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioA4', {exercises: docs });
    });
});
//Scenario 2
router.get('/scenarioB0', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioB0', {exercises: docs });
    });
});
router.get('/scenarioB1', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioB1', {exercises: docs });
    });
});
router.get('/scenarioB2', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioB2', {exercises: docs });
    });
});
router.get('/scenarioB3', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioB3', {exercises: docs });
    });
});
router.get('/scenarioB4', ensureAuthenticated, function(req, res){
    Exercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioB4', {exercises: docs });
    });
});

//INTERMEDIATE
router.get('/scenarioC0', ensureAuthenticated, function(req, res){
    Interexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioC0', {exercises: docs });
    });
});
router.get('/scenarioC1', ensureAuthenticated, function(req, res){
    Interexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioC1', {exercises: docs });
    });
});
router.get('/scenarioC2', ensureAuthenticated, function(req, res){
    Interexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioC2', {exercises: docs });
    });
});
router.get('/scenarioC3', ensureAuthenticated, function(req, res){
    Interexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioC3', {exercises: docs });
    });
});
router.get('/scenarioC4', ensureAuthenticated, function(req, res){
    Interexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioC4', {exercises: docs });
    });
});

//ADVANCED
router.get('/scenarioD0', ensureAuthenticated, function(req, res){
    Advexercise.findthedata(function(err, docs){
        if(err) throw err;
        else res.render('TestGames/scenarioD0', {exercises: docs });
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