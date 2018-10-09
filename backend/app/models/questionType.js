var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionTypeSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('QuestionType', QuestionTypeSchema);