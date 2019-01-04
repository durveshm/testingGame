var mongoose = require('mongoose');


// User Schema
var exerciseSchema = mongoose.Schema({
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

var Exercise = module.exports = mongoose.model('Exercise', exerciseSchema);

module.exports.createExercise = function(newExercise, callback){
            newExercise.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    Exercise.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    Exercise.findById(id, callback);
}

module.exports.findthedata = function(callback){
    Exercise.find({}, callback);
}

module.exports.getObjectID = function(objectid, callback){
    var query = {_id: objectid};
    Exercise.findOne(query, callback);
}

