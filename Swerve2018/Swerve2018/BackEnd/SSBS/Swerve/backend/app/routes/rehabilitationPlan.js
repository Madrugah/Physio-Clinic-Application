var express = require('express');
var router = express.Router();
var RehabilitationPlan = require('../models/rehabilitationPlan');
var PatientProfile = require('../models/patientProfile');
const sysvars             = require('../../config/db');
const bodyParser     = require('body-parser');
const jwt        	 = require("jsonwebtoken");
const crypto = require('crypto');

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();// User is authorized
        } else {
            res.send(403);//Send a message to inform access denial
        }
    }
    
    function checkAdmin(tokenUsed){
        PatientProfile.findOne({token: tokenUsed}, (err, user) => {
            if(err) {
                console.log(err);
                return false;
            }
            if(user.isAdmin){
                return true;
            }else return false;
        });
    }

router.route('/SavedRehabilitationPlan')
    .post((request, response) => {  
        RehabilitationPlan.findOne( {name: request.body.name}, (err, foundalrd) =>{
            if(foundalrd){
                response.json({
                    type: false,
                    resp: "that Plan has already been created, choose another name", 
                });
            } else{
                var newplan = new RehabilitationPlan(request.body);
                newplan.save(function (error) {
                    if (error) response.json({type: false, error: error});
                    response.json({
                        type: true,
                        resp: "Successfully added new rehab plan!",
                        newplan : newplan
                    });
                });
            }
        });
    }).get((request, response) => {
        RehabilitationPlan.find({}, (err, plansRecieved) => {
            if (err) {
                response.json({
                    type: false, 
                    error: err
                });
            }else{
                response.json({
                    type: true, 
                    plansRecieved : plansRecieved 
                }); 
            }
        });
    }); 
    
router.route('/SavedRehabilitationPlan/getsingle/:plan_id')
    .get(function (request, response) {
        RehabilitationPlan.findById(request.params.plan_id, function (error, plan) {
            if (error) {
                response.json({
                    type: false, 
                    data : plan 
                });
            }
            else {
                response.json({
                    type: true, 
                    data : plan 
                });
            }
        });
    })
    .delete(function (request, response) {
        RehabilitationPlan.findByIdAndRemove(request.params.plan_id,
            function (error, deleted) {
                if (!error) {
                response.json({form: deleted});
                }
            }
        );
    });
    
router.route('/SavedRehabilitationPlan/edit')
    .post(function (request, response) { 
        RehabilitationPlan.findOne( {name: request.body.name}, (err, foundalrd) =>{
            if(foundalrd){// update all fields 
                foundalrd.description = request.body.description;
                // foundalrd.authorName = request.body.authorName; 
                foundalrd.goal = request.body.goal;
                foundalrd.timeFrameToComplete = request.body.timeFrameToComplete;
                foundalrd.tests = request.body.tests;
                foundalrd.exercises = request.body.exercises;
                foundalrd.save(function (error) {
                    if (error) response.json({type: false, error: error});
                    response.json({
                        type: true,
                        resp: "Successfully edited plan!",
                        data : foundalrd
                    });
                });
            } else{
            response.json({
                type: false,
                resp: "that plan cant be found", 
            });
            }
        });
    });
    router.route('/SavedRehabilitationPlan/edit2')
    .post(function (request, response) { 
        RehabilitationPlan.findById( {_id: request.body.id}, (err, foundalrd) =>{
            if(foundalrd){// update all fields 
                foundalrd.name = request.body.rehabPlan.name;
                foundalrd.description = request.body.rehabPlan.description;
                // foundalrd.authorName = request.body.authorName; 
                foundalrd.goal = request.body.rehabPlan.goal;
                foundalrd.timeFrameToComplete = request.body.rehabPlan.timeFrameToComplete;
                foundalrd.tests = request.body.rehabPlan.tests;
                foundalrd.exercises = request.body.rehabPlan.exercises;
                foundalrd.save(function (error) {
                    if (error) response.json({type: false, error: error});
                    response.json({
                        type: true,
                        resp: "Successfully editted plan!",
                        data : foundalrd
                    });
                });
            } else{
            response.json({
                type: false,
                resp: "That plan was unable to be found", 
            });
            }
        });
    }); 
    
module.exports = router;