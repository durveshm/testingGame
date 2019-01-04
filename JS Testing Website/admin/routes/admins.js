var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');

// Register
router.get('/register', function (req, res) {
    res.render('adminregister');
});

// Login
router.get('/login', function (req, res) {
    res.render('login', { message: req.flash('loginMessage') });
});


// Register User
router.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);


    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
           res.render('register', {error : errors})
    } else {
        var newAdmin = new Admin({
            username:username,
            password:password
        });

        Admin.createAdmin(newAdmin, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/admins/login');

    }

});

passport.use(new LocalStrategy(
    function (username, password, done) {
        Admin.getAdminByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {

                return done(null, false, { error: 'Unknown User' });
            }

            Admin.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { error: 'Unknown Password' });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Admin.getAdminById(id, function (err, user) {
        done(err, user);
    });
});



router.post('/login',
    passport.authenticate('local', { failureRedirect: '/admins/login', failureFlash: 'Invalid credentials. Please try again.' }),
    function (req, res) {
    req.flash('success_msg', 'You are now logged in');
    res.redirect('/');
    });


router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});





module.exports = router;