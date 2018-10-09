var express = require('express');
var router = express.Router();
var Form = require('../models/forms');
router.route('/SavedForm')
    .post(function (request, response) { 
        console.log("hit adding form route, with info: " );
        console.log(request.body);
        Form.findOne( {name: request.body.name}, (err, foundalrd) =>{
            if(foundalrd){
                console.log("alrd made that form!");
                response.json({
                    type: false,
                    resp: "that Form has already been created, choose another name", 
                });
            } else{
                var newform = new Form(request.body);
                newform.save(function (error) {
                    if (error) response.json({type: false, error: error});
                    response.json({
                        type: true,
                        resp: "Successfully added new question!",
                        newform : newform
                    });
                });
            }
        });
    }).get((request, response) => {
        Form.find({}, (err, formsRecieved) => {
            if (err) {
                response.json({
                    type: false, 
                    error: err
                });
            }else{
                response.json({
                    type: true, 
                    formsRecieved : formsRecieved 
                }); 
            }
        });
    }); 
    
router.route('/SavedForm/getsingle/:form_id')
    .get(function (request, response) {
        console.log('hit getting form by i'); 
        Form.findById(request.params.form_id, function (error, form) {
            if (error) {
                response.json({
                    type: false, 
                    data : form 
                });
            }
            else {
                response.json({
                    type: true, 
                    data : form 
                });
            }
        });
    })
    .delete(function (request, response) {
        Form.findByIdAndRemove(request.params.form_id,
            function (error, deleted) {
                if (!error) {
                response.json({form: deleted});
                }
            }
        );
    });
router.route('/SavedForm/edit')
    .post(function (request, response) { 
        Form.findById(request.body._id, (err, foundalrd) =>{
            if(foundalrd){// update all fields 
                foundalrd.name = request.body.name;
                foundalrd.description = request.body.description;
                foundalrd.questions = request.body.questions;
                foundalrd.save(function (error) {
                    if (error){
                        response.json({
                            type: false, 
                            error: error
                            
                        }); 
                    } else{
                    response.json({
                        type: true,
                        resp: "Successfully added new assessment form!",
                        data : foundalrd
                    });
                    }
                });
            } else{
            response.json({
                type: false,
                resp: "that Form cant be found", 
            });
            }
        });
    });

module.exports = router;