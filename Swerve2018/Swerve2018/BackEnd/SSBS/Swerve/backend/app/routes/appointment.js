var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');
var PatientProfile = require('../models/patientProfile');

router.route('/')
    .post(function (request, response) {
        if(request.body._id==undefined && request.body.state==0){
            var appointment = new Appointment(request.body);
            appointment.save(function (error) {
                if (error) response.send(error); 
                response.json({appointment: appointment});
                return;
            });
        } else if(request.body._id==undefined){
            PatientProfile.findOne( {token: request.body.Patient}, (err, patient) =>{
                var appointment = new Appointment(request.body);
                appointment.givenName=patient.givenName;
                appointment.familyName=patient.familyName;
                appointment.save(function (error) {
                    if (error) response.send(error); 
                    response.json({appointment: appointment});
                    return;
                });
            });
        }else{
            Appointment.findOne( {_id: request.body._id}, (err, appointment) =>{
                appointment.title=request.body.title;
                appointment.dates=request.body.dates;
                appointment.description=request.body.description;
                appointment.state=request.body.state;
                appointment.save();
                    response.json({appointment: appointment});
                    return;
            });
        }//*/

    })
    .get(function (request, response) {
        Appointment.find(function (error, appointments) {
            if (error) response.send(error);
            return response.json({appointments: appointments});
        });
    });
router.route('/get/:physicianToken')
    .get(function (request, response) {
        Appointment.find( { Physician: request.params.physicianToken }, function (error, appointments) {
            if (error) response.send(error);
            return response.json({appointments: appointments});
        });
    });
router.route('/getMy/:patientToken')
    .get(function (request, response) {
        Appointment.find( { Patient: request.params.patientToken }, function (error, appointments) {
            if (error) response.send(error);
            return response.json({appointments: appointments});
        });
    });
router.route('/:appointment_id')
    .get(function (request, response) { 
        Appointment.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({appointment: appointment});
            }
        });
    })
    .delete(function (request, response) {
        Appointment.findByIdAndRemove(request.params.appointment_id,
            function (error, deleted) {
                if (!error) {
                response.json({appointment: deleted});
                }
            }
        );
    });

module.exports = router;