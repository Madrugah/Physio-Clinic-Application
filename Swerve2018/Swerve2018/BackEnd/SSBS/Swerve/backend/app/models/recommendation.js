var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecommendationSchema   = new Schema({
    timeStamp: Date,
    decision: String,
    test: { type: Schema.ObjectId, ref: 'AssessmentTests' }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);