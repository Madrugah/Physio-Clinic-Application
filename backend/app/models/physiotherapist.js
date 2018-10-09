/*global options*/
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhysiotherapistSchema   = new Schema({
    dateHired: Date,
    dateFinished: Date
},options);

module.exports = mongoose.model('Physiotherapist', PhysiotherapistSchema);