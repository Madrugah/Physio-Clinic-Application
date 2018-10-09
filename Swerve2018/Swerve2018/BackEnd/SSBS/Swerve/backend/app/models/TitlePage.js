var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TitlePageSchema   = new Schema({
    TLT: String,
    TLS: String,
    TLB: String,
    TRT: String,
    TRB: String,
    BRT: String,
    BRB: String
});

module.exports = mongoose.model('TitlePage', TitlePageSchema);