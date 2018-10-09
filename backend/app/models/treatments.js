var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TreatmentsSchema   = new Schema({
    dateAssigned: Date,
    response: { type: Schema.ObjectId, ref: 'Recommendation' },
    physio: { type: Schema.ObjectId, ref: 'Physiotherapist' },
    plan: {type: Schema.ObjectId, ref: 'RehabilitationPlan'}
});

module.exports = mongoose.model('Treatments', TreatmentsSchema);