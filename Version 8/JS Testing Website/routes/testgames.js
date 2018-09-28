var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');
var Interexercise = require('../models/interexercises');
var Advexercise = require('../models/advexercises');
var tmp = require('tmp');
var fs = require('fs');
const execFile = require('child_process').exec;
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
// setup console reporter
const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
    listStyle: 'indent', // "flat"|"indent"
    timeUnit: 'ms',      // "ms"|"ns"|"s"
    timeThreshold: { ok: 500, warn: 1000, ouch: 3000 }, // Object|Number
    activity: true,
    emoji: true,         // boolean or emoji-map object
    beep: true
});
var stats = 0;
var myReporter = {  jasmineStarted: function(suiteInfo) {
        console.log('Running suite with '
            + suiteInfo.totalSpecsDefined);
    },
    suiteStarted: function(result) {
        console.log('Suite started: '
            + result.description
            + ' whose full description is: '
            + result.fullName);
    },
    specStarted: function(result) {
        console.log('Spec started: '
            + result.description
            + ' whose full description is: '
            + result.fullName);
    },
    specDone: function(result) {
        console.log('Spec: '
            + result.description
            + ' was '
            + result.status);
        if (result.status === 'failed'){
            stats = stats + 1;
        }

        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: '
                + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        console.log(result.passedExpectations.length);
    },
    suiteDone: function(result) {
        console.log('Suite: '
            + result.description
            + ' was '
            + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('Suite '
                + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },
    jasmineDone: function(result) {
        console.log('Finished suite: '
            + result.overallStatus);
        console.log('the stats are ' + stats);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('Global '
                + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    }
};

jasmine.addReporter(myReporter);

jasmine.loadConfig({
    spec_dir: 'test',
    spec_files: [],
    random: false,
    seed: null,
    stopSpecOnExpectationFailure: false
});
jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;


//custom reporter




jasmine.onComplete(function(passed) {
    if(stats === 1) {
        console.log('Correct answer');
        req.flash('success_msg', 'You have scored a point. Click next to play the next exercise.');
        res.redirect('scenarioA0')
    }
    else {
        console.log('Incorrect answer');
        req.flash('error_msg', 'Test case failed. Please try again.');
        res.redirect('scenarioA0')
    }
});

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

router.post('/scenarioA0', function (req, res) {
    var code = req.body.code;
    var mutation = req.body.mutation;
    var solution = req.body.solution;

    console.log(code);
    //remove line breaks
    code = code.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    mutation = mutation.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    solution = solution.replace(/(\r\n\t|\n|\r|\t)/gm,"");

    var Ospec = code + solution;
    var Mspec = mutation + solution;
    console.log(Ospec, Mspec);
    // Validation
    //req.checkBody('code', 'Error. Please try again.').notEmpty();
    //req.checkBody('mutation', 'Error. Please try again.').notEmpty();
    req.checkBody('solution', 'Test Solution is required. Please click run test before saving.').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        Exercise.findthedata(function(err, docs){
             res.render('TestGames/scenarioA0',  {error: errors, exercises: docs });
        });

    } else {
        stats = 0;
        tmp.file({ postfix: '.spec.js' }, function (err, path, fd, cleanupCallback) {
            tmp.file({ postfix: '.spec.js' }, function (error, pathname, fdes, cleanupCallback) {
                if (err) throw err;
                if (error) throw error;

                console.log("/", path);
                console.log("output.js", fd, fdes);


                fs.writeFileSync(path, Ospec);
                fs.writeFileSync(pathname, Mspec);
                // initialize and execute
                //jasmine.env.clearReporters();
                //jasmine.execute();

                var npath = path;
                npath = npath.replace(/\\/g, '/');
                console.log(npath);
                var npathname = pathname;
                npathname = npathname.replace(/\\/g, '/');
                console.log(npathname);

                execFile('cd node_modules/.bin', [],  (error, stdout, stderr) => {
                    if (error) {
                        console.log(process.cwd());
                        console.error('stderr', stderr);
                        Exercise.findthedata(function(err, docs){
                            if(err) throw err;
                            else res.render('TestGames/scenarioA0', {exercises: docs, error: err });
                        });
                    }
                    execFile('jasmine ' + npath , [],  (error, stdout, stderr) => {
                        if (error) {
                            console.log(process.cwd());
                            console.error('stderr', stderr);
                            }
                            else {
                                stats = stats + 1;
                                console.log(stats);
                        }
                            console.log('stdout', stdout);
                        });
                    execFile('jasmine ' + npathname , [],  (error, stdout, stderr) => {
                        if (error) {
                            console.log(process.cwd());
                            console.error('stderr', stderr);
                            stats = stats + 1;
                            console.log(stats);
                        }console.log('stdout', stdout);
                        console.log(stats);
                        if (stats === 2) {
                            req.flash('success_msg', 'Success!');

                            res.redirect('/testgames/scenarioA0');
                        }
                        else {
                            Exercise.findthedata(function(err, docs){
                                if(err) throw err;
                                else res.render('TestGames/scenarioA0', {exercises: docs, error_msg : 'Fail!' });
                            });
                        }
                    });

                    console.log('stdout', stdout)});
                    console.log('final', stats);


                });


        });

}});

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