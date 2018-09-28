var mongoose = require('mongoose');


// User Schema
var ccSchema = mongoose.Schema({
    username: {
        type: String,
        index:true
    },
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

var CC = module.exports = mongoose.model('cc', ccSchema);

module.exports.createCC = function(newCC, callback){
            newCC.save(callback);
}

module.exports.getCCByUsername = function(username, callback){
    var query = {username: username};
    CC.findOne(query, callback);
}

module.exports.getCCById = function(id, callback){
    CC.findById(id, callback);
}

module.exports.findthedata = function(callback){
    CC.find({}, callback);
}

module.exports.getObjectID = function(objectid, callback){
    var query = {_id: objectid};
    CC.findOne(query, callback);
}