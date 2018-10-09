var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercises');
router.route('/')
    .post(function (request, response) {
        var exercise = new Exercise.Model(request.body.exercise);
        exercise.save(function (error) {
            if (error) response.send(error);
            response.json({exercise: exercise});
        });
    })
    .get(function (request, response) {
        Exercise.Model.find(function (error, exercises) {
            if (error) response.send(error);
            response.json({exercises: exercises});
        });
    });
router.route('/:patient_id')
    .get(function (request, response) { 
        Exercise.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercise: exercise});
            }
        });
    })
    .delete(function (request, response) {
        Exercise.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                response.json({exercise: deleted});
                }
            }
        );
    });

module.exports = router;