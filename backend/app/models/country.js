var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CountrySchema   = new Schema({
    name: String,
    province:[
      {type: Schema.Types.ObjectId, ref: 'Province'}
    ]
});

module.exports = mongoose.model('Country', CountrySchema);