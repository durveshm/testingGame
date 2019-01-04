var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Exercise = require('../models/exercise');
var Interexercise = require('../models/interexercises');
var Advexercise = require('../models/advexercises');
var Rexercise = require('../models/rexercises');
var Interrexercise = require('../models/interrexercises');
var tmp = require('tmp');
var fs = require('fs');
const execFile = require('child_process').exec;

//Get scenarios List
router.get('/scenarioList/:type', ensureAuthenticated, function(req, res){
    var sid = req.params.type;
    var ex;
    if (sid === 'TB'){
        Exercise.findthedata(function(err, docs){
            if(err) throw err;
            else
                res.render('TestGames/scenarioList', {user: req.user, exercises: docs, type : 'TB' });
        });
    }
    else if (sid === 'TI'){
        Interexercise.findthedata(function(err, docs){
            if(err) throw err;
            else
                res.render('TestGames/scenarioList', {user: req.user, exercises: docs, type : 'TI'  });
        });
    }
    else if (sid === 'TA'){
        Advexercise.findthedata(function(err, docs){
            if(err) throw err;
            else
                res.render('TestGames/scenarioList', {user: req.user, exercises: docs, type : 'TA'  });
        });
    }
    else if (sid === 'FB'){
        Rexercise.findthedata(function(err, docs){
            if(err) throw err;
            else
                res.render('TestGames/scenarioList', {user: req.user, exercises: docs, type : 'FB'  });
        });
    }
    else if (sid === 'FI'){
        Interrexercise.findthedata(function(err, docs){
            if(err) throw err;
            else
                res.render('TestGames/scenarioList', {user: req.user, exercises: docs, type : 'FI'  });
        });
    }

});



router.get('/scenario/:type/:id', ensureAuthenticated, function(req, res){
    var scid = req.params.type;
    var objectid = req.params.id;
    var scen;
    if (scid === 'TB'){
        Exercise.getObjectID(objectid, function(err, scenario){
            if(err) throw err;
            else
                res.render('TestGames/scenarioT', {exercises: scenario, sid : objectid, type : scid });
        });
    }
    else if (scid === 'TI'){
        Interexercise.getObjectID(objectid, function(err, scenario){
            if(err) throw err;
            else
                res.render('TestGames/scenarioT', {exercises: scenario, sid : objectid, type : scid });
        });
    }
    else if (scid === 'TA'){
        Advexercise.getObjectID(objectid, function(err, scenario){
            if(err) throw err;
            else
                res.render('TestGames/scenarioT', {exercises: scenario, sid : objectid, type : scid });
        });
    }
    else if (scid === 'FB'){
        Rexercise.getObjectID(objectid, function(err, scenario){
            if(err) throw err;
            else
                res.render('TestGames/scenarioT', {exercises: scenario, sid : objectid, type : scid });
        });
    }
    else if (scid === 'FI') {
        Interrexercise.getObjectID(objectid, function(err, scenario){
            if(err) throw err;
            else
                res.render('TestGames/scenarioT', {exercises: scenario, sid : objectid, type : scid });
        });
    }
});



router.post('/scenario', function (req, res) {
    var objectid = req.body.objectId;
    var code = req.body.code;
    var mutation = req.body.mutation;
    var solution = req.body.solution;
    var user = req.user;
    var id = user._id;
    var type = req.body.type;

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
        req.flash('error_msg', 'Test case failed! The mutant has not been killed. Please try again.');

        res.redirect('/testgames/scenario/' + objectid);

    } else {
        stats = 0;
        tmp.file({ postfix: '.spec.js' }, function (err, path, fd, cleanupCallbackk) {
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
                        req.flash('error_msg', 'Error. Please try again.');
                        res.redirect('/testgames/scenario/' + objectid);
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

                            User.gameScoring(user, id, objectid, function(err, user){
                                if(err) throw err;
                                console.log(req.user.gameScores);
                            });
                            req.flash('success_msg', 'You have completed the follow scenario! Press Exit to return to the Scenario List.');

                            res.redirect('/testgames/scenario/' + type + '/' + objectid);
                            cleanupCallback();
                            cleanupCallbackk();
                        }
                        else {
                            req.flash('error_msg', 'Test case failed! The mutant has not been killed. Please try again.');

                            res.redirect('/testgames/scenario/' + type + '/' + objectid);
                            cleanupCallback();
                            cleanupCallbackk();
                        }
                    });

                    console.log('stdout', stdout)});
                    console.log('final', stats);


                });


        });

}});

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