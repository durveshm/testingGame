var mongoose = require('mongoose');


// User Schema
var rexerciseSchema = mongoose.Schema({
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

var Rexercise = module.exports = mongoose.model('Rexercise', rexerciseSchema);

module.exports.createRexercise = function(newRexercise, callback){
            newRexercise.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    Rexercise.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    Rexercise.findById(id, callback);
}

module.exports.findthedata = function(callback){
    Rexercise.find({}, callback);
}

module.exports.getObjectID = function(objectid, callback){
    var query = {_id: objectid};
    Rexercise.findOne(query, callback);
}