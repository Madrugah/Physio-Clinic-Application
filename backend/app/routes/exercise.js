var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercises');
/*
the problems with exercises

should these be here:
frequency?
duration?
target date?


action step is what kind of var?


upon delete, we cant really cascade. how do we store that info

*/
router.route('/')
    .post(function (request, response) {
        //var exercise = new Exercise(request.body);
        if(request.body._id==undefined){
            var exercise = new Exercise(request.body);
            exercise.save(function (error) {
                if (error) response.send(error); 
                response.json({exercise: exercise});
                return;
            });
        } else{
            Exercise.findOne( {_id: request.body._id}, (err, exercise) =>{
                exercise.name=request.body.name;
                exercise.description=request.body.description;
                exercise.objectives=request.body.objectives;
                exercise.authorName=request.body.authorName;
                exercise.actionSteps=request.body.actionSteps;
                exercise.location=request.body.location;
                exercise.frequency=request.body.frequency;
                exercise.duration=request.body.duration;
                exercise.targetDate=request.body.targetDate;
                exercise.multimediaURL=request.body.multimediaURL;
                exercise.save();//{
                    // if (error) response.send(error); 
                    response.json({exercise: exercise});
                    return;
//                };
            });
        }//*/

    })
    .put(function (request, response) {
        Exercise.find(function (error, exercises) {
            for (var i = 0; i<exercises.length;i++){
                exercises[i].multimediaURL=undefined;
            }
            if (error) response.send(error);
            return response.json({exercises: exercises});
        });
    })
    .get(function (request, response) {
        Exercise.find(function (error, exercises) {
            if (error) response.send(error);
            return response.json({exercises: exercises});
        });
    });
router.route('/:exercise_id')
    .get(function (request, response) { 
        Exercise.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercise: exercise});
            }
        });
    })
    .delete(function (request, response) {
        Exercise.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                response.json({exercise: deleted});
                }
            }
        );
    });

module.exports = router;