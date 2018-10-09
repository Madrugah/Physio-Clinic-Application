var express = require('express');
var router = express.Router();
var PatientProfile = require('../models/patientProfile');
var CompletedTest = require('../models/completedTest');
var Message = require('../models/messages');

const sysvars = require('../../config/db');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

//jimmy start
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};
// jimmy end


// the function used to get session info and ensure user is authorized
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next(); // user is authorized, move along frand
    }
    else {
        res.send(403); // tell them they r nutt allowed in here
    }
}


router.route('/')
    .post(function(request, response) {
        var patient = new PatientProfile(request.body.patient);
        patient.save(function(error) {
            if (error) response.send(error);
            response.json({ patient: patient });
        });
    })
    .get(function(request, response) {
        PatientProfile.find(function(error, patients) {
            if (error) response.send(error);
            response.json({ patients: patients });
        });
    });

router.route('/createProfile')
    .post(function(request, response) {
        console.log(request.body)
        PatientProfile.findOne({ email: request.body.email.toLowerCase() }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: false,
                    resp: "That email already has an associated account!",
                });
            }
            else {
                var prof = new PatientProfile(request.body);
                console.log(prof)
                prof.isPaid = false;
                prof.email = prof.email.toLowerCase();
                var salt = genRandomString(16); /** Gives us salt of length 16 */
                var passwordData = sha512(request.body.password, salt);
                prof.password = passwordData.passwordHash;
                prof.salt = passwordData.salt;
                prof.isAdmin = false;
                prof.isPhysician = false;
                prof.isReset = false;
                // prof.isAdmin =true;
                prof.save(function(error, user) {
                    if (error) response.json({ type: false, error: error });
                    user.token = jwt.sign(user.toJSON(), sysvars.keyHash);
                    user.save(function(err, user1) {
                        response.json({
                            type: true,
                            data: user1,
                            token: user1.token,
                            resp: "Successfully created a new profile"
                        });
                    });
                });
            }
        });
    });

router.route('/createProfileAdmin')
    .post(function(request, response) {
        console.log(request.body)
        PatientProfile.findOne({ email: request.body.email.toLowerCase() }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: false,
                    resp: "That email already has an associated account!",
                });
            }
            else {
                var prof = new PatientProfile(request.body);
                console.log(prof)
                prof.email = prof.email.toLowerCase();
                var salt = genRandomString(16); /** Gives us salt of length 16 */
                var passwordData = sha512(request.body.password, salt);
                prof.password = passwordData.passwordHash;
                prof.salt = passwordData.salt;
                prof.isAdmin = true;
                prof.isPhysician = false;
                prof.isReset = false;
                // prof.isAdmin =true;
                prof.save(function(error, user) {
                    if (error) response.json({ type: false, error: error });
                    user.token = jwt.sign(user.toJSON(), sysvars.keyHash);
                    user.save(function(err, user1) {
                        response.json({
                            type: true,
                            data: user1,
                            token: user1.token,
                            resp: "Successfully created a new profile"
                        });
                    });
                });
            }
        });
    });

router.route('/createProfilePhys')
    .post(function(request, response) {
        console.log(request.body)
        PatientProfile.findOne({ email: request.body.email.toLowerCase() }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: false,
                    data: "That email already has an associated account!",
                });
            }
            else {
                var prof = new PatientProfile(request.body);
                console.log(prof)
                prof.email = prof.email.toLowerCase();
                var salt = genRandomString(16); /** Gives us salt of length 16 */
                var passwordData = sha512(request.body.password, salt);
                prof.password = passwordData.passwordHash;
                prof.salt = passwordData.salt;
                prof.isAdmin = false;
                prof.isPhysician = true;
                prof.isReset = false;
                // prof.isAdmin =true;
                prof.save(function(error, user) {
                    if (error) response.json({ type: false, error: error });
                    user.token = jwt.sign(user.toJSON(), sysvars.keyHash);
                    user.save(function(err, user1) {
                        response.json({
                            type: true,
                            data: user1,
                            token: user1.token,
                            resp: "Successfully created a new profile"
                        });
                    });
                });
            }
        });
    });

router.route('/getProfile')
    .get(function(request, response) {
        PatientProfile.find({}, function(err, patientProfiles) {
            if (err) {

                response.json({
                    type: false,
                    data: "Error occured: " + err
                });
            }
            else {
                var emailList = [];
                patientProfiles.forEach(function(emailProfile) {
                    emailList.push(emailProfile.email);
                });
                response.json({
                    data: emailList,
                })
            }
        })
    });
router.route('/getToken')
    .post(function(request, response) {
        console.log(request.body.email);
        PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
            if (emailProfile) {
                console.log("See, sent right");
                console.log(emailProfile.token);
                response.json({
                    type: true,
                    data: emailProfile.token,
                    data2: "drup"
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });
    
router.route('/getPhysicians')
    .get(function(request, response) {
        PatientProfile.find({ isPhysician: true }, function(err, patientProfiles) {
            if (err) {
                response.json({
                    type: false,
                    data: "Error occured: " + err
                });
            }
            else {
                response.json({
                    data: patientProfiles
                })
            }
        })
    });
router.route('/getInfo')
    .get(function(request, response) {
        PatientProfile.find({}, function(err, patientProfiles) {
            if (err) {

                response.json({
                    type: false,
                    data: "Error occured: " + err
                });
            }
            else {
                var emailList = [];
                var firstList = [];
                var lastList = [];
                var profileList = [];

                patientProfiles.forEach(function(eachProfile) {
                    profileList.push(eachProfile);

                });

                for (var i = 0; i < profileList.length; i++) {
                    if (profileList[i].givenName == null || profileList[i].givenName == "null" || profileList[i].givenName == "undefined" || profileList[i].givenName == undefined ||
                        profileList[i].familyName == null || profileList[i].familyName == "null" || profileList[i].familyName == undefined || profileList[i].familyName == "undefined") {
                        profileList.splice(i, 1);
                        i--;
                    }
                }
                for (val of profileList) {
                    emailList.push(val.email);
                    firstList.push(val.givenName);
                    lastList.push(val.familyName);
                }
                response.json({
                    type: true,
                    emailList: emailList,
                    firstList: firstList,
                    lastList: lastList,
                    profileList: profileList

                })
            }
        })
    });

router.route('/retrieveProfile')
    .post(function(request, response) {
        PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile,
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/retrieveProfile1')
    .post(function(request, response) {
        PatientProfile.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile,
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/retrieveProfile2')
    .post(function(request, response) {
        PatientProfile.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile.email,
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/updateProfile')
    .post(function(request, response) {
        PatientProfile.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                emailProfile.city = request.body.form.city;
                emailProfile.province = request.body.form.province;
                emailProfile.country = request.body.form.country;
                emailProfile.givenName = request.body.form.givenName;
                var ohboi = emailProfile.givenName.charAt(0).toUpperCase();
                emailProfile.givenName = emailProfile.givenName.slice(1);
                emailProfile.givenName = ohboi + emailProfile.givenName;
                emailProfile.familyName = request.body.form.familyName;
                var ohboi2 = emailProfile.familyName.charAt(0).toUpperCase();
                emailProfile.familyName = emailProfile.familyName.slice(1);
                emailProfile.familyName = ohboi2 + emailProfile.familyName;
                emailProfile.DOB = request.body.form.DOB;
                emailProfile.postalCode = request.body.form.postalCode;
                emailProfile.phone = request.body.form.phone;
                emailProfile.save();
                response.json({
                    type: true,
                    data: "Successfully updated profile!",
                    data2: emailProfile
                });
            }
            else {
                response.json({
                    type: false,
                    data: "Error!",
                });
            }
        });
    });

router.route('/updateProfile2')
    .post(function(request, response) {
        PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
            if (emailProfile) {
                emailProfile.city = request.body.form.city;
                emailProfile.province = request.body.form.province;
                emailProfile.country = request.body.form.country;
                emailProfile.givenName = request.body.form.givenName;
                var ohboi = emailProfile.givenName.charAt(0).toUpperCase();
                emailProfile.givenName = emailProfile.givenName.slice(1);
                emailProfile.givenName = ohboi + emailProfile.givenName;
                emailProfile.familyName = request.body.form.familyName;
                var ohboi2 = emailProfile.familyName.charAt(0).toUpperCase();
                emailProfile.familyName = emailProfile.familyName.slice(1);
                emailProfile.familyName = ohboi2 + emailProfile.familyName;
                emailProfile.DOB = request.body.form.DOB;
                emailProfile.postalCode = request.body.form.postalCode;
                emailProfile.phone = request.body.form.phone;
                emailProfile.save();
                response.json({
                    type: true,
                    data: "Successfully updated profile!",
                    data2: emailProfile
                });
            }
            else {
                response.json({
                    type: false,
                    data: "Error!",
                });
            }
        });
    });

router.route('/updatePass').post((request, response) => {
    PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
        var passCheck = sha512(request.body.oldPass, emailProfile.salt);
        if (emailProfile.password == passCheck.passwordHash) {
            emailProfile.isReset = false;
            var salt = genRandomString(16); /** Gives us salt of length 16 */
            var passwordData = sha512(request.body.newPass, salt);
            emailProfile.password = passwordData.passwordHash;
            emailProfile.salt = passwordData.salt;
            emailProfile.save((err, prof) => {
                if (err) {
                    response.json({
                        type: false,
                        data: "Error!",
                    });
                }
                else {
                    response.json({
                        type: true,
                        data: "Successfully updated profile!",
                        data2: emailProfile
                    });
                }
            });
        }
        else {
            response.json({
                type: false,
                data: "Incorrect previous password!"
            });
        }
    })
});

router.route('/updatePass2').post((request, response) => {
    PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
        emailProfile.isReset = true;
        console.log("Is this hit?");
        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = sha512(request.body.newPass, salt);
        emailProfile.password = passwordData.passwordHash;
        emailProfile.salt = passwordData.salt;
        emailProfile.save((err, prof) => {
            if (err) {
                response.json({
                    type: false,
                    data: "Error!",
                });
            }
            else {
                response.json({
                    type: true,
                    data: "Successfully updated profile!",
                    data2: emailProfile
                });
            }
        });
    })
});


router.route('/validate')
    .post(function(request, response) {
        PatientProfile.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile.isAdmin,
                });
            }
            else {
                response.json({
                    type: false,
                    data: "Error!",
                });
            }
        });
    });

router.route('/:patient_id')
    .get(function(request, response) {
        PatientProfile.findById(request.params.patient_id, function(error, patient) {
            if (error) {
                response.send({ error: error });
            }
            else {
                response.json({ patient: patient });
            }
        });
    })
    .delete(function(request, response) {
        PatientProfile.findByIdAndRemove(request.params.patient_id,
            function(error, deleted) {
                if (!error) {
                    response.json({ patient: deleted });
                }
            }
        );
    });

router.route('/email/:email_id')
    .get(function(request, response) {
        PatientProfile.findOne({ email: request.params.email_id }, function(error, patient) {
            if (error) {
                response.send({ type: false });
            }
            else {
                if (patient == null) {
                    response.type = false;
                    response.send({ type: false });
                }
                else {
                    response.send({ type: true });
                }
            }
        });
    })

router.route('/addPlan')
    .post(function(request, response) {
        PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
            if (emailProfile) {
                emailProfile.plan.push(request.body.planId);
                emailProfile.patientPlans.push(true);
                emailProfile.save(function(error) {
                    if (error) {
                        console.log(error);
                        response.json({
                            type: false,
                            error: error
                        });
                    }
                    response.json({
                        type: true,
                        resp: "successfully added new type!",
                        data: emailProfile
                    });
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/addPics')
    .post(function(request, response) {
        PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
            if (emailProfile) {
                emailProfile.photos = request.body.pics;
                emailProfile.save(function(error) {
                    if (error) {
                        console.log(error);
                        response.json({
                            type: false,
                            error: error
                        });
                    }
                    response.json({
                        type: true,
                        resp: "successfully adjusted pictures!",
                        data: emailProfile
                    });
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/addNote')
    .post(function(request, response) {
        PatientProfile.findOne({ email: request.body.email }, (err, emailProfile) => {
            if (emailProfile) {
                console.log(request.body.note);
                emailProfile.notes.push(request.body.note);
                emailProfile.save(function(error) {
                    if (error) {
                        console.log(error);
                        response.json({
                            type: false,
                            error: error
                        });
                    }
                    response.json({
                        type: true,
                        resp: "successfully added a note!",
                        data: emailProfile
                    });
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });


router.route('/completeTest')
    .post(function(request, response) {
        PatientProfile.findOne({ token: request.body.userToken }, (err, emailProfile) => {
            if (emailProfile) {
                let testWritten = new CompletedTest(request.body);
                testWritten.save(function(error) {
                    if (error) {
                        console.log(error);
                        response.json({
                            type: false,
                            error: error
                        });
                    }
                });

                // if we are doing it by id
                // emailProfile.completedTests.push(testWritten);

                // have to wrap it in an object to keep thing s clean otherwise (lkeeping the tests separate) 
                emailProfile.completedTests.push(
                    testWritten);
                emailProfile.save(function(error) {
                    if (error) {
                        console.log(error);
                        response.json({
                            type: false,
                            error: error
                        });
                    }
                    response.json({
                        type: true,
                        resp: "successfully added test!",
                        data: emailProfile
                    });
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/rateHealth')
    .post(function(request, response) {
        PatientProfile.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                // save to users ratings
                const newRating = {
                    rating: request.body.rating,
                    time: request.body.time,
                };
                emailProfile.healthRatings.push(newRating);
                emailProfile.save(function(error) {
                    if (error) {
                        console.log(error);
                        response.json({
                            type: false,
                            error: error
                        });
                    }
                    response.json({
                        type: true,
                        resp: "successfully added rating!",
                        data: emailProfile
                    });
                });
            }
            else {
                response.json({
                    type: false,
                    resp: "Error!",
                });
            }
        });
    });

router.route('/getTestResults')
    .post(
        // function for grabbing the completed tests of a user
        function(request, response) {
            PatientProfile.findOne({ token: request.body.userToken }, (error, emailProfile) => {
                if (error) {
                    console.log(error);
                    response.json({
                        type: false,
                        error: error
                    });
                }
                response.json({
                    type: true,
                    resp: "successfully grabbed users tests!",
                    data: emailProfile.completedTests
                });
            });

        });

router.route('/getHealthRatings')
    .post(
        // function for grabbing the completed ratings of a user
        function(request, response) {
            PatientProfile.findOne({ email: request.body.email }, (error, emailProfile) => {
                if (error) {
                    console.log(error);
                    response.json({
                        type: false,
                        error: error
                    });
                }
                response.json({
                    type: true,
                    resp: "successfully grabbed users ratings!",
                    data: emailProfile.healthRatings
                });
            });

        });

router.route('/removeNote')
    .post(
        // function for grabbing the completed tests of a user
        function(request, response) {
            PatientProfile.findOne({ email: request.body.email }, (error, emailProfile) => {
                if (error) {
                    console.log(error);
                    response.json({
                        type: false,
                        error: error
                    });
                }
                let index = emailProfile.notes.indexOf(request.body.note);
                if (index > -1) {
                    emailProfile.notes.splice(index, 1);
                }
                emailProfile.save((err, editedProf) => {
                    if (err) {
                        response.json({
                            type: false,
                            data: "Error!",
                        });
                    }
                    else {
                        response.json({
                            type: true,
                            data: "Successfully removed note!",
                            data2: editedProf
                        });
                    }
                });
            });

        });

router.route('/removePlan')
    .post(
        // function for grabbing the completed tests of a user
        function(request, response) {
            PatientProfile.findOne({ email: request.body.email }, (error, emailProfile) => {
                if (error) {
                    console.log(error);
                    response.json({
                        type: false,
                        error: error
                    });
                }
                let index = emailProfile.plan.indexOf(request.body.planId);
                if (index > -1) {
                    emailProfile.plan.splice(index, 1);
                }
                emailProfile.save((err, editedProf) => {
                    if (err) {
                        response.json({
                            type: false,
                            data: "Error!",
                        });
                    }
                    else {
                        response.json({
                            type: true,
                            data: "Successfully removed plan!",
                            data2: editedProf
                        });
                    }
                });
            });

        });

router.route('/sendMessage')
    .post(
        // function for grabbing the completed tests of a user
        function(request, response) {
            PatientProfile.findOne({ email: request.body.email }, (error, emailProfile) => {
                if (error) {
                    console.log(error);
                    response.json({
                        type: false,
                        error: error
                    });
                }
                else {

                    //console.log(request.body);
                    var message = new Message(request.body)
                    message.save(function(error) {
                        if (error) response.send(error);
                        //console.log(message);
                        emailProfile.messages.push(message._id);
                        emailProfile.save(function(error) {
                            if (error) response.send(error);
                            console.log(emailProfile);
                        });
                        response.json({
                            type: true,
                            message: message
                        });
                    });
                    //console.log(); 
                }
            });

        });
router.route('/getEmailMessages')
    .post(function(request, response) {
        var email = request.body[0].email
        console.log(email)
        let messages = [];
        Message.find({email: email}, (error, messages) => {
            if (error) {
                console.log(error);
                response.json({
                    type: false,
                    error: error
                });
            }
            else {
                console.log(messages);
                response.send({
                    type: true,
                    messages: messages
                });
            }

        });

        // for (var i = 0; i < mess.length; i++) {
        //     Message.find(mess[i], (error, message) => {
        //         if (error) {
        //             console.log(error);
        //             response.json({
        //                 type: false,
        //                 error: error
        //             });
        //         }
        //         else {
        //             console.log("Fuk");
        //             messages.push(message);
        //             console.log(messages)
        //             console.log(i)

        //             if (i == (mess.length - 1)) {
        //                 console.log("send back")
        //                 response.send({
        //                     type: true,
        //                     messages: messages
        //                 });
        //             }
        //         }

        //     });
        // }
        // for(let msg of mess){
        //     Message.findById(msg, (error, same) => {
        //         if (error) {
        //             console.log(error);
        //             response.json({
        //                 type: false,
        //                 error: error
        //             });
        //         }
        //         else {
                    
        //             messages.push(JSON.parse(JSON.stringify(same)));
        //             console.log(same);
        //         }
        //     }); 
        // }
        // console.log('completed messages');
        // console.log(messages);
    });

router.route('/deleteAcc')
    .post(function(request, response) {
        PatientProfile.findOne({ email: request.body.email }, (error, emailProfile) => {
            emailProfile.remove((err, editedProf) => {
                if (err) {
                    response.json({
                        type: false,
                        data: "Error!",
                    });
                }
                else {
                    response.json({
                        type: true,
                        data: "Successfully removed plan!",
                        data2: editedProf
                    });
                }
            });
        });
    });

router.route('/checker')
    .post(function(request, response) {
        console.log(request.body.email);
        PatientProfile.findOne({ email: request.body.email }, (error, emailProfile) => {
            if (emailProfile == null || emailProfile == undefined) {
                response.json({
                    type: false,
                    data: "It doesn't exist",
                    error: error
                });
            }
            else {
                response.json({
                    type: true,
                    data: "It exists"
                });
            }
        });
    });

router.route('/AddReceipt')
    .post(function(request, response) {
        console.log('ohno');
        PatientProfile.findOne({ token: request.body.tokerino} , (err, foundProf)=>{
            foundProf.receipts.push(request.body.payload);
            foundProf.isPaid = true;
            console.log(request.body.payload);
            foundProf.save((err, savedObj)=>{
                console.log(savedObj);
                response.json({
                    type: true,
                    data: savedObj
                });
            });
        });
    });

module.exports = router;
