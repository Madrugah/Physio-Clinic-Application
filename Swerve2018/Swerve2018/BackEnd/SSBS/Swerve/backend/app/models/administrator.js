/*global options*/ 
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var options = {discriminatorKey: 'kind'};

var AdministratorSchema   = new Schema({
    dateHired: Date,
    dateFinished: Date
}, options);

module.exports = mongoose.model('Administrator', AdministratorSchema);