/*global options*/
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
    parentId: String,
    myMessage: String,
    email: String,
    date: String,
    viewed: Boolean,
    senderEmail: String,
});

// var Message = mongoose.model('message', MessageSchema);
// exports.Model = Message;

module.exports  = mongoose.model('message', MessageSchema);   