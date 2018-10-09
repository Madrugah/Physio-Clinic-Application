var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AssessmentTestsSchema   = new Schema({
    name: String,
    description: String,
    authorName: String,
    assessmentTool: { type: Schema.ObjectId, ref: 'Forms' }
});

module.exports = mongoose.model('AssessmentTests', AssessmentTestsSchema);