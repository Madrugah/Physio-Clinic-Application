var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CitySchema   = new Schema({
    name: String
});

module.exports = mongoose.model('City', CitySchema);