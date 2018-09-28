var express = require('express');
var router = express.Router();
var CC = require('../models/cc');
var tmp = require('tmp');
var fs = require('fs');
const execFile = require('child_process').exec;

// Register
router.get('/createScenario', ensureAuthenticated, function (req, res) {
    res.render('createScenario');
});



//code mutation explanation solution
// Register User
router.post('/createScenario', function (req, res) {
    var user = req.user.username;
    var code = req.body.code;
    var mutation = req.body.mutation;
    var explaincode = req.body.explaincode;
    var explainmut = req.body.explainmut;
    var solution = req.body.solution;
    console.log(code);
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

    var Ospec = code + solution;
    var Mspec = mutation + solution;
    console.log(Ospec, Mspec);
    // Validation
    //req.checkBody('code', 'Error. Please try again.').notEmpty();
    //req.checkBody('mutation', 'Error. Please try again.').notEmpty();


    if (errors) {
        res.render('createScenario', {error : errors})
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
                            var newCC = new CC({
                                username: user,
                                code: code,
                                mutation: mutation,
                                explaincode: explaincode,
                                explainmut: explainmut,
                                solution: solution
                            });

                            CC.createCC(newCC, function(err, user){
                                if(err) throw err;
                                console.log(newCC);
                            });

                            req.flash('success_msg', 'You have completed the follow scenario! Press Exit to return to the Scenario List.');

                            res.redirect('createScenario');
                            cleanupCallback();
                            cleanupCallbackk();
                        }
                        else {
                            req.flash('error_msg', 'Test case failed! The mutant has not been killed. Please try again.');

                            res.redirect('createScenario');
                            cleanupCallback();
                            cleanupCallbackk();
                        }
                    });

                    console.log('stdout', stdout)});
                console.log('final', stats);


            });


        });


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