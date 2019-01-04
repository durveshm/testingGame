var mongoose = require('mongoose');


// User Schema
var interexerciseSchema = mongoose.Schema({
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

var Interexercise = module.exports = mongoose.model('Interexercise', interexerciseSchema);

module.exports.createInterexercise = function(newinterexercise, callback){
            newinterexercise.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    Interexercise.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    Interexercise.findById(id, callback);
}