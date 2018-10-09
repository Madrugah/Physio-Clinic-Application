var mongoose     = require('mongoose');
var Schema       = mongoose.Schema; 

var ExerciseSchema   = new Schema({
    name: String,
    description: String,
    objectives: String,
    authorName: String,
    actionSteps: [String],
    location: String,
    frequency: Number,
    duration: Number,
    targetDate: Number,
    multimediaURL: [String] 
});
/*
{ description: '',
  objectives: '',
  authorName: '',
  actionSteps: '',
  location: '',
  frequency: '',
  duration: '',
  targetDate: '' }
*/
module.exports = mongoose.model('Exercise', ExerciseSchema);