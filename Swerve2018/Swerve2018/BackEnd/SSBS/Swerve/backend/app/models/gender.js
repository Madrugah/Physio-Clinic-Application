var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GenderSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Gender', GenderSchema);