var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AppointmentSchema   = new Schema({
    title : String,
    dates: [Number],
    description: String,
    state: Number,
    Patient: String,
    Physician: String,
    givenName:String,
    familyName:String
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
/*

States available

note: no appointment implies open

0: blocked
1: confirmed booking
2: pending booking



Dates:

[0-2] - date - Day, Month, Year
[3-4] - start time - Minute, Hour
[5-6] - end time - Minute, Hour



*/