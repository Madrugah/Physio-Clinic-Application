
var options = { discriminatorKey: 'kind' };
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new mongoose.Schema(
  { 
    familyName: String,
    givenName: String,
    email: String,
    account: { type: Schema.ObjectId, ref: 'UserAccount' }
  },
  options);
var User = mongoose.model('User', UserSchema);