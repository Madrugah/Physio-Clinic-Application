var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RehabilitationPlanSchema   = new Schema({
    name: String,
    description: String,
    goal: String,
    timeFrameToComplete: String,
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}], 
    tests: [{type: Schema.Types.ObjectId, ref: 'Forms'}] 
});

module.exports = mongoose.model('RehabilitationPlan', RehabilitationPlanSchema);