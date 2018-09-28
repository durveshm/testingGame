var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');
var Interexercise = require('../models/interexercises');
var Advexercise = require('../models/advexercises');
var Rexercise = require('../models/rexercises');
var Interrexercise = require('../models/interrexercises');

// Get Homepage
router.get('/', function(req, res){
    //var points = req.user.points;
    //console.log(points);
    res.render('index');
});


//Get User Profile
router.get('/users/profile', ensureAuthenticated, function(req, res){
    Exercise.count(function(err,countData){
    Interexercise.count(function(err,countData1){
    Advexercise.count(function(err,countData2){
    Rexercise.count(function(err,countData3){
    Interrexercise.count(function(err,countData4){
//you will get the count of number of documents in mongodb collection in the variable
        var count = countData + countData1 + countData2 + countData3 + countData4;
        res.render('profile', {user: req.user, total : count });
    });
    });
    });
    });
    });

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