/*global options*/
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PatientProfileSchema   = new Schema({
    email: String,
    password: String,
    salt: String,
    token: String,
    isAdmin: Boolean,
    isPhysician: Boolean,
    isReset: Boolean,
    givenName: String,
    familyName: String,
    DOB: Date,
    postalCode: String,
    phone: String,
    maritalStatus: String,
    healthCardNo: String,
    occupation: String,
    isPaid: Boolean,
    others: String,
    payment:[
      {type: Schema.Types.ObjectId, ref: 'Payment'}
    ],
    receipts:[{
      payId: String,
      create_time: String,
      email: String,
      fNme: String,
      lName: String,
      amount: Number,
      currency: String
    }],
    messages:[
      {type: Schema.Types.ObjectId, ref: 'Message'}
    ],
    photos: [String],
    notes: [String],
    country: String,
    province: String,
    city: String,
    gender: {type: Schema.Types.ObjectId, ref: 'Gender'},
    appointment:[
      {type: Schema.Types.ObjectId, ref: 'Appointment'}
    ],
    plan:[
      {type: Schema.Types.ObjectId, ref: 'Treatments'}
    ], 
    patientPlans:[Boolean],
    // this way saves it by id, but requires more gets later to retrieve it, the initial pull will be smaller tho? idk up 2 u bois
    // might be best to ave it as ids
     completedTests:  [{
       name: String,
       description: String, 
       userToken: String,
       results:[{ 
        name: String, 
        helpDescription: String,  
        answer: String,
        questionText: String
      }]
    }],
    healthRatings: [{
        time: Number,
        rating: Number
        
    }]
});

// var PatientProfile = mongoose.model('patientProfile', PatientProfileSchema);
// exports.Model = PatientProfile;

module.exports  = mongoose.model('patientProfile', PatientProfileSchema);   