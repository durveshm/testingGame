var express = require('express');
var router = express.Router();
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

router.get('/saveGameB0', function(req, res){
    var scen = 'B';
    var points = 0;
    updateScore(points, scen, req, res);
});

router.get('/saveGameB1', function(req, res){
    var scen = 'B';
    var points = 1;
    updateScore(points, scen, req, res);
});

router.get('/saveGameB2', function(req, res){
    var scen = 'B';
    var points = 2;
    updateScore(points, scen, req, res);
});

router.get('/saveGameB3', function(req, res){
    var scen = 'B';
    var points = 3;
    updateScore(points, scen, req, res);
});

router.get('/saveGameB4', function(req, res){
    var scen = 'B';
    var points = 4;
    updateScore(points, scen, req, res);
});

router.get('/saveGameC0', function(req, res){
    var scen = 'C';
    var points = 0;
    updateScore(points, scen, req, res);
});

router.get('/saveGameC1', function(req, res){
    var scen = 'C';
    var points = 1;
    updateScore(points, scen, req, res);
});

router.get('/saveGameC2', function(req, res){
    var scen = 'C';
    var points = 2;
    updateScore(points, scen, req, res);
});

router.get('/saveGameC3', function(req, res){
    var scen = 'C';
    var points = 3;
    updateScore(points, scen, req, res);
});

router.get('/saveGameC4', function(req, res){
    var scen = 'C';
    var points = 4;
    updateScore(points, scen, req, res);
});

router.get('/saveGameD0', function(req, res){
    var scen = 'D';
    var points = 0;
    updateScore(points, scen, req, res);
});

router.get('/saveGameE0', function(req, res){
    var scen = 'E';
    var points = 0;
    updateScore(points, scen, req, res);
});

router.get('/saveGameE1', function(req, res){
    var scen = 'E';
    var points = 1;
    updateScore(points, scen, req, res);
});

router.get('/saveGameE2', function(req, res){
    var scen = 'E';
    var points = 2;
    updateScore(points, scen, req, res);
});

router.get('/saveGameE3', function(req, res){
    var scen = 'E';
    var points = 3;
    updateScore(points, scen, req, res);
});

router.get('/saveGameE4', function(req, res){
    var scen = 'E';
    var points = 4;
    updateScore(points, scen, req, res);
});

function updateScore(points, scen, req, res){
    var user = req.user;
    var id = user._id;
    var point = points;
    var sce = scen;

    console.log(user.username);
    console.log(point);
    User.updatePoints(user, id, point, sce, function(err, user){
        if(err) throw err;
        console.log(user);
    });
    var l;
    if (scen === 'A' || scen === 'B' || scen =='C' || scen === 'D') {
       l = '/testgames/scenario';
    }
    else if (scen === 'E' || scen === 'F' || scen =='G'){
        l = '/mutantgames/scenario';
    }

    var path = l + scen + points;
    console.log(path);
    res.redirect(url.format({
        pathname:path,
        user:req.user,
    }));
}


module.exports = router;