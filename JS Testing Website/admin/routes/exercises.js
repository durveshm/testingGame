var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Exercise = require('../models/exercises');

// Register
router.get('/createScenario',  function (req, res) {
    res.render('createScenario');
});
//code mutation explanation solution
// Register User
router.post('/createScenario', function (req, res) {

    var code = req.body.code;
    var mutation = req.body.mutation;
    var explaincode = req.body.explaincode;
    var explainmut = req.body.explainmut;
    var solution = req.body.solution;

    //remove line breaks
    code = code.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    mutation = mutation.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    explaincode = explaincode.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    explainmut = explainmut.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    solution = solution.replace(/(\r\n\t|\n|\r|\t)/gm,"");

    // Validation
    req.checkBody('code', 'Original Program Code is required').notEmpty();
    req.checkBody('mutation', 'Mutated Program Code is required').notEmpty();
    req.checkBody('explaincode', 'Explanation of Code is required').notEmpty();
    req.checkBody('explainmut', 'Explanation of Mutation is required').notEmpty();
    req.checkBody('solution', 'Test Solution is required').notEmpty();



    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        res.render('createScenario', {error : errors})
    } else {
        var newExercise = new Exercise({
            code: code,
            mutation: mutation,
            explaincode: explaincode,
            explainmut: explainmut,
            solution: solution
        });

        Exercise.createExercise(newExercise, function(err, user){
            if(err) throw err;
            console.log(newExercise);
        });



        req.flash('success_msg', 'You have successfully uploaded your Scenario.');

        res.redirect('/');

    }

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