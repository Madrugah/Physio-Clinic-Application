var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TestResultSchema   = new Schema({
    name: String,
    description: String,
    userToken: String,
    results: [{ 
        name: String, 
        helpDescription: String,  
        answer: String,
        questionText: String
    }]
});

module.exports = mongoose.model('TestResult', TestResultSchema);