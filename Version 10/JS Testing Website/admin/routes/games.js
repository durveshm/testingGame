var express = require('express');
var router = express.Router();
var CC = require('../models/cc');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



//Get scenarios List
router.get('/scenarioList', function(req, res){
    CC.findthedata(function(err, docs){
        if(err) throw err;
        else
            res.render('scenarioList', {exercises: docs});
    });
});

router.get('/scenario/:id',  function(req, res) {
    var objectid = req.params.id;
    var scen;
    CC.getObjectID(objectid, function (err, scenario) {
        if (err) throw err;
        else
            res.render('scenario', {exercises: scenario, sid: objectid});
    });

});

module.exports = router;