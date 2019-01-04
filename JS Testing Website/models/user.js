var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    gameScores: {
        type : Array
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}


module.exports.editProfile = function(user, id, username, name, email, points, callback) {

    User.findOne({ _id : id }, function (err, doc){
        user.name = name;
        user.username = username;
        user.email = email;

        user.save();
    });
}

module.exports.editProfile = function(user, id, username, name, email, points, callback) {

    User.findOne({ _id : id }, function (err, doc){
        user.name = name;
        user.username = username;
        user.email = email;

        user.save();
    });
}


module.exports.gameScoring = function(user, id, objectid, callback) {

    User.find({_id : id}, function (err, doc){
        //user.gameScores.push({objectId: objectid, score: 1});
        var exists = 0;
        var length = user.gameScores.length;
        var fields = user.gameScores;
        console.log(length, fields);
        var i;
        for (i = 0; i < length; i++) {
            console.log(fields[i].objectId);
            if (fields[i].objectId === objectid){
                exists = exists + 1;
            }
        }
        if (exists !== 0) {
            console.log('points already added')
        }
        else if (exists === 0) {
            user.gameScores.push({objectId: objectid, score: 1});
            console.log(user);
            user.save();
        }
    });



}