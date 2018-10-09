var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FormsSchema   = new Schema({
    name: String,
    description: String,
    questions:[
      {type: Schema.Types.ObjectId, ref: 'Question'}
    ],
    author: { type: Schema.ObjectId, ref: 'Administrator' }
});

module.exports = mongoose.model('Forms', FormsSchema);