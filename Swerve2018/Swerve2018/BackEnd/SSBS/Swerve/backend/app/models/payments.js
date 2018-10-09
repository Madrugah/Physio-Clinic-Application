var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaymentSchema   = new Schema({
    dayTimeStamp: Date,
    amount: Number,
    note: String
});

module.exports = mongoose.model('Payment', PaymentSchema);

