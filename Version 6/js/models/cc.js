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

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    CC.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    CC.findById(id, callback);
}