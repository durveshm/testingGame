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
    scenarioA: {
        type : Array
    } ,
    scenarioB: {
        type : Array
    },
    scenarioC: {
        type : Array
    },
    scenarioD: {
        type : Array
    },
    scenarioE: {
        type : Array
    },
    scenarioF: {
        type : Array
    },
    scenarioG: {
        type : Array
    },
    scenarioH: {
        type : Array
    },
    scenarioI: {
        type : Array
    },
    scenarioJ: {
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

module.exports.updatePoints = function(user, id, point, scen, callback) {

    User.findOne({ _id: id }, function (err, doc){
console.log(point);
        if (scen = 'A'){var score = user.scenarioA}
        else if (scen = 'B'){var score = user.scenarioB}
        else if (scen = 'C'){var score = user.scenarioC}
        else if (scen = 'D'){var score = user.scenarioD}
        else if (scen = 'E'){var score = user.scenarioE}
        else if (scen = 'F'){var score = user.scenarioF}
        else if (scen = 'G'){var score = user.scenarioG}
        else if (scen = 'H'){var score = user.scenarioH}
        else if (scen = 'I'){var score = user.scenarioI}
        else if (scen = 'J'){var score = user.scenarioJ}

        console.log(score);

        var i;
        var a = [0,0 ,0,0,0,0,0,0,0,0];
        for (i = 0; i < 10; i++) {
            a[i] = score[i];
        }
        a[point] = 1;
        if (scen = 'A'){user.scenarioA = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'B'){user.scenarioB = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'C'){user.scenarioC = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'D'){user.scenarioD = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'E'){user.scenarioE = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'F'){user.scenarioF = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'G'){user.scenarioG = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'H'){user.scenarioH = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'I'){user.scenarioI = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}
        else if (scen = 'J'){user.scenarioJ = [a[0], a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]}


        //console.log(user.scenarioA);

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