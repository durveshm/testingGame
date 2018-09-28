var mongoose = require('mongoose');


// User Schema
var advexerciseSchema = mongoose.Schema({
    code: {
        type: String
    },
    mutation: {
        type: String
    },
    explaincode: {
        type: String
    },
    explainmut: {
        type: String
    },
    solution: {
        type: String
    }
});

var Advexercise = module.exports = mongoose.model('Advexercise', advexerciseSchema);

module.exports.createAdvexercise = function(newadvexercise, callback){
            newadvexercise.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    Advexercise.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    Advexercise.findById(id, callback);
}

module.exports.findthedata = function(callback){
    Advexercise.find({}, callback);
}