var express = require('express');
var router = express.Router();
var QuestionType = require('../models/questionType');
var Question = require('../models/questions');

router.route('/SavedQuestions')
    .post(function (request, response) { 
        Question.findOne( {name: request.body.name}, (err, foundalrd) =>{
            if(foundalrd){
                response.json({
                    type: false,
                    resp: "That question has already been created", 
                });
            } else{
                var newQ = new Question(request.body);
                newQ.save(function (error) {
                    if (error) response.json({type: false, error: error});
                    response.json({
                        type: true,
                        resp: "Successfully added new question!",
                        newQ : newQ 
                    });
                });
            }
        });
    }).get((request, response) => {
        Question.find({}, (err, questionsRecieved) => {
            if (err) {
                response.json({
                    type: false, 
                    error: err
                });
            }else{
                for( var question of questionsRecieved){ 
                    QuestionType.findOne( { _id : question.type}, (err, foundtype) => {
                        question.type = foundtype;
                    });
                }
                for( var question of questionsRecieved){}
                response.json({
                    type: true, 
                    questionsRecieved : questionsRecieved 
                }); 
            }
        });
    });


router.route('/QuestionType')
    .post(function (request, response) { 
        QuestionType.findOne( {name: request.body.name}, (err, foundalrd) =>{
            if(foundalrd){
                response.json({
                    type: false,
                    resp: "that type has already been created", 
                });
            } else{
                var qtype = new QuestionType(request.body);  
                qtype.save(function (error) {
                    if (error) response.json({type: false, error: error});
                    response.json({
                        type: true,
                        resp: "successfully added new type!",
                        qtype : qtype
                        
                    });
                });
            }
        }); 
    }).get((request, response) => {
        QuestionType.find({}, (err, qtypes) => {
            if (err) {
                response.json({
                    type: false, 
                    error: err});
            }else{ 
                response.json({
                    type: true, 
                    qtypes : qtypes 
                }); 
            }
        });
    });
    
router.route('/SavedQuestions/getsingle/:question_id')
    .get(function (request, response) {
        Question.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.json({
                    type: false, 
                    data : question 
                });
            }
            else {
                response.json({
                    type: true, 
                    data : question 
                });
            }
        });

    }).delete(function (request, response) {
        Question.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.json({
                    type: false, 
                    data : question 
                });
            }
            else {
                question.remove((err) =>{
                   response.json({
                        type: true, 
                        data : question 
                    }); 
                });
            }
        });
    }) 
    
    router.route('/QuestionType/getsingle/:question_id')
    .get(function (request, response) {
        QuestionType.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.json({
                    type: false, 
                    data : question 
                });
            }
            else {
                response.json({
                    type: true, 
                    data : question 
                });
            }
        });
    }).delete(function (request, response) {
        QuestionType.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.json({
                    type: false, 
                    data : question 
                });
            }
            else {
                question.remove((err) =>{
                   response.json({
                        type: true, 
                        data : question 
                    }); 
                });
            }
        });
    }) 
    router.route('/SavedQuestions/changeSingle/:question_id')
    .post(function (request, response) {
        Question.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.json({
                    type: false, 
                    data : question 
                });
            }
            else {
                question.name=request.body.name;
                question.type=request.body.type;
                question.helpDescription=request.body.helpDescription;
                question.questionText=request.body.questionText;
                question.save(function (error2) {
                    if (error2) response.json({type: false, error: error2});
                    response.json({
                        type: true, 
                        data : question 
                    });
                });
            }
        })
    })



module.exports = router;