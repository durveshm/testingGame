var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
const url = require('url');


router.get('/saveGameA0', function(req, res){
    var scen = 'A';
    var points = 0;
    updateScore(points, scen, req, res);
});

router.get('/saveGameA1', function(req, res){
    var scen = 'A';
    var points = 1;
    updateScore(points, scen, req, res);
});

router.get('/saveGameA2', function(req, res){
    var scen = 'A';
    var points = 2;
    updateScore(points, scen, req, res);
});

router.get('/saveGameA3', function(req, res){
    var scen = 'A';
    var points = 3;
    updateScore(points, scen, req, res);
});

router.get('/saveGameA4', function(req, res){
    var scen = 'A';
    var points = 4;
    updateScore(points, scen, req, res);
});

function updateScore(points, scen, req, res){
    var user = req.user;
    var id = user._id;
    var point = points;
    var sce = scen;

    console.log(user.username);
    console.log(user.points);
    User.updatePoints(user, id, point, sce, function(err, user){
        if(err) throw err;
        console.log(user);
    });
    var path = '/games/scenario' + scen + points;
    console.log(path);
    res.redirect(url.format({
        pathname:path,
        user:req.user,
    }));
}


module.exports = router;