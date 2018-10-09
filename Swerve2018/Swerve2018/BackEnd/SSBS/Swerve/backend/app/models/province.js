var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProvinceSchema   = new Schema({
    name: String,
    city:[
      {type: Schema.Types.ObjectId, ref: 'City'}
    ]
});

module.exports = mongoose.model('Province', ProvinceSchema);