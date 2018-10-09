var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    name: String,
    questionText: String,
    helpDescription: String,
    type: { type: Schema.ObjectId, ref: 'QuestionType' }
});

module.exports = mongoose.model('Questions', QuestionSchema);