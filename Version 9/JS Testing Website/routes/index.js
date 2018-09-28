var express = require('express');
var router = express.Router();
var tmp = require('tmp');
var fs = require('fs');

const Jasmine = require('jasmine');
const jasmine = new Jasmine();

function runTest(){
    tmp.file(function (err, path, fd, cleanupCallback) {
        if (err) throw err;

        console.log("/", path);
        console.log("output.js", fd);
        jasmine.loadConfig({
            spec_dir: 'test',
            spec_files: [path],
            random: false,
            seed: null,
            stopSpecOnExpectationFailure: false
        });
        jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

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
        fs.writeFileSync(path, "describe('Write Your Test Group Descriptions Here', () => {it('Write Your Test Expectation Here', () => {expect(true).toBe(true);})});");
        // initialize and execute
        jasmine.env.clearReporters();
        jasmine.addReporter(reporter);
        jasmine.execute();
    });
}



// Get Homepage
router.get('/', function(req, res){
    //var points = req.user.points;
    //console.log(points);
    res.render('index');
});
//Ensure authenticated to access homepage - no warning because first accessing website
function ensureAuthenticatedHome(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error','You are not logged in');
        res.redirect('/users/guestHome');
    }
}


//Get User Profile
router.get('/users/profile', ensureAuthenticated, function(req, res){
    res.render('profile', {user: req.user });


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