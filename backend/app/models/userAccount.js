var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserAccountSchema   = new Schema({
    userAccountName: String,
    encryptedPassword: String
});

module.exports = mongoose.model('UserAccount', UserAccountSchema);