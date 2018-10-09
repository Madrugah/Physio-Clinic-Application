//server.js 

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var bodyParser = require('body-parser');
var jwt        = require("jsonwebtoken");
const mongoose = require('mongoose');
var mongo = require('mongodb');
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();
// var Grid = require('gridfs-stream');
// var fs = require('fs');
var conn = mongoose.createConnection("mongodb://localhost");
// var multer = require('multer');
// var ejs = require('ejs');
// var path = require('path');
// var storage = multer.diskStorage({
//     destination: './images',
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + '-' + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {fileSize: 1000000},
//     fileFilter: function(req, file, cb) {
//         checkFileType(file,cb);
//     }
// }).single('myImage');

// function checkFileType(file,cb){
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if(minetype && extname){
//         return cb(null,true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// set routes
var patientProfileRoutes = require('./app/routes/patientProfile');
var exerciseRoutes = require('./app/routes/exercise');
var appointmentRoutes = require('./app/routes/appointment');
var rehabilitationPlanRoutes = require('./app/routes/rehabilitationPlan');
var formRoutes = require('./app/routes/forms');
var questionRoutes = require('./app/routes/questions');
var authRoutes = require('./app/routes/auth');




app.use(function (request, response, next) {
    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    console.log('inside middleware');
    next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.set('view engine', 'ejs');
var PatientProfile = require('./app/models/patientProfile');

// app.use(express.static('./images'));
// app.get('/', (req, res) => res.render('index'));

// app.post('/images', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       res.render('index', {
//         msg: err
//       });
//     } else {
//       if(req.file == undefined){
//         res.render('index', {
//           msg: 'Error: No File Selected!'
//         });
//       } else {
//         res.render('index', {
//           msg: 'File Uploaded!',
//           file: `images/${req.file.filename}`
//         });
//       }
//     }
//   });
// });
 
mongoose.connect('mongodb://localhost/SelfStart');

// use Express to handle routes
app.use('/auth', authRoutes);
app.use('/patientProfile', patientProfileRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/rehabilitationPlan', rehabilitationPlanRoutes);
app.use('/forms', formRoutes);
app.use('/questions', questionRoutes);

// START THE SERVER
// =============================================================================
 
app.listen(port);
console.log('Magic happens on port ' + port);