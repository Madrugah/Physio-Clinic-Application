// depracated, we are using completedTest now (diff structure). 
// keeping this for legace in case its needed later?

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TestResultSchema   = new Schema({
    question: String,
    answer: String,
    test: { type: Schema.ObjectId, ref: 'AssessmentTests' }
});

module.exports = mongoose.model('TestResult', TestResultSchema);