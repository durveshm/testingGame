var mongoose = require('mongoose');


// User Schema
var interrexerciseSchema = mongoose.Schema({
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

var Interrexercise = module.exports = mongoose.model('InterRexercise', interrexerciseSchema);

module.exports.createInterrexercise = function(newinterrexercise, callback){
            newinterrexercise.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    Interrexercise.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    Interrexercise.findById(id, callback);
}
module.exports.findthedata = function(callback){
    Interrexercise.find({}, callback);
}

module.exports.getObjectID = function(objectid, callback){
    var query = {_id: objectid};
    Interrexercise.findOne(query, callback);
}