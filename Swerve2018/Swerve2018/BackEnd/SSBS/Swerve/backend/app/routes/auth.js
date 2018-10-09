const sysvars = require('../../config/db');
const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var Patient = require('../models/patientProfile'); // the model we are using to verify from
var TitlePageRef = require('../models/TitlePage');
const crypto = require('crypto');



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



// endpoint for authenticating user , password: req.body.password
router.route("/authenticate").post(function(req, res) {
    Patient.findOne({ email: req.body.email.toLowerCase() }, function(err, user) { //
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        }
        else { // if user exists, return their info
            if (user) {
                var passwordData = sha512(req.body.password, user.salt);
                if (user.password == passwordData.passwordHash) {
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    });
                }
                else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
            else { // else tell them they are wrong
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
});

// router.route("/authenticate").post(function(req, res) {
//     Patient.findOne({ email: req.body.email.toLowerCase() }, function(err, user) { //
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         }
//         else { // if user exists, return their info
//             if (user) {
//                 var passwordData = sha512(req.body.password, user.salt);
//                 if (user.password == passwordData.passwordHash) {
//                     res.json({
//                         type: true,
//                         data: user,
//                         token: user.token
//                     });
//                 }
//                 else {
//                     res.json({
//                         type: false,
//                         data: "Incorrect email/password"
//                     });
//                 }
//             }
//             else { // else tell them they are wrong
//                 res.json({
//                     type: false,
//                     data: "Incorrect email/password"
//                 });
//             }
//         }
//     });
// });

router.route('/validate')
    .post(function(request, response) {
        Patient.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile.isAdmin,
                    data2: emailProfile.givenName,
                    data3: emailProfile.isPhysician,
                    data4: emailProfile.email
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

router.route('/confirmUser')
    .post(function(request, response) {
        Patient.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile.email,
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

router.route('/isReset')
    .post(function(request, response) {
        Patient.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile.isReset,
                    data2: emailProfile.isPaid,
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

router.route('/createTitlePage')
    .post(function(request, response) {
        TitlePageRef.find({}, (err, titlePage) => {
            if (titlePage) {
                titlePage[0].TLT = request.body.TLT;
                titlePage[0].TLS = request.body.TLS;
                titlePage[0].TLB = request.body.TLB;
                titlePage[0].TRT = request.body.TRT;
                titlePage[0].TRB = request.body.TRB;
                titlePage[0].BRT = request.body.BRT;
                titlePage[0].BRB = request.body.BRB;
                titlePage[0].save();
                response.json({
                    type: true,
                    data: "Successfully updated title page."
                })
            }
            else {
                response.json({
                    type: false,
                    data: "Error!"
                })
            }
        });
    });

router.route('/getTitlePage')
    .post(function(request, response) {
        console.log("getting title")
        TitlePageRef.find({}, (err, titlePage) => {
            if (titlePage) {
                response.json({
                    type: true,
                    data: titlePage[0]
                })
            }
            else {
                response.json({
                    type: false,
                    data: "Error!"
                })
            }
        });
    });
    
    


router.route('/completedProfile')
    .post(function(request, response) {
        Patient.findOne({ token: request.body.token }, (err, emailProfile) => {
            if (emailProfile) {
                response.json({
                    type: true,
                    data: emailProfile.name
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

process.on('uncaughtException', function(err) {
    console.log(err);
});


module.exports = router;
