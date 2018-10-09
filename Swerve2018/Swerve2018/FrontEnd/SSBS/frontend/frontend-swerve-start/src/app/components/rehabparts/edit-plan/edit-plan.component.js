"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rehab_plan_1 = require('../../../models/rehab-plan');
var EditPlanComponent = (function () {
    function EditPlanComponent(router, questionMaker, assesmentMaker, exerciseFetch, rehabManage, route, authServ) {
        this.router = router;
        this.questionMaker = questionMaker;
        this.assesmentMaker = assesmentMaker;
        this.exerciseFetch = exerciseFetch;
        this.rehabManage = rehabManage;
        this.route = route;
        this.authServ = authServ;
        this.rehabPlan = new rehab_plan_1.RehabPlan();
    }
    EditPlanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authServ.validate().then(function (resp) {
            var validateRaw = JSON.parse(resp._body);
            //console.log('recieved from auth:');
            //console.log(validateRaw);
            if (!validateRaw.data && !validateRaw.data3) {
                _this.router.navigateByUrl('');
            }
            else {
                _this.editId = _this.route.snapshot.params.id;
                _this.assesmentMaker.getForms().then(function (response) {
                    var parsedResp = JSON.parse(response._body);
                    if (parsedResp.type) {
                        _this.currentTestList = parsedResp.formsRecieved;
                        //console.log(_this.currentTestList);
                    }
                    else {
                        alert(parsedResp.response);
                    }
                });
                _this.exerciseFetch.getExercises(function (org) {
                    //console.log(org);
                    _this.currentExerciseList = org.exercises;
                });
                _this.selectedExercises = [];
                _this.rehabPlan.exercises = [];
                _this.rehabPlan.tests = [];
                _this.selectedTests = [];
                // get the values of selected plan
                _this.rehabManage.getSinglePlanWithId(_this.editId).then(function (response) {
                    var parsedResp = JSON.parse(response._body);
                    if (parsedResp.type) {
                        //console.log(parsedResp.data);
                        _this.exercisesToFetch = parsedResp.data.exercises;
                        _this.testsToFetch = parsedResp.data.tests;
                        _this.rehabPlan.name = parsedResp.data.name;
                        _this.rehabPlan.description = parsedResp.data.description;
                        _this.rehabPlan.goal = parsedResp.data.goal;
                        _this.rehabPlan.timeFrameToComplete = parsedResp.data.timeFrameToComplete;
                        for (var _i = 0, _a = _this.testsToFetch; _i < _a.length; _i++) {
                            var testIDs = _a[_i];
                            _this.assesmentMaker.getSingleFormWithId(testIDs).then(function (qBack) {
                                var parsedqBack = JSON.parse(qBack._body);
                                _this.selectedTests.push(parsedqBack.data);
                            });
                        }
                        for (var _b = 0, _c = _this.exercisesToFetch; _b < _c.length; _b++) {
                            var exercIDs = _c[_b];
                            _this.exerciseFetch.getSingleExercise(exercIDs, function (qBack) {
                                _this.selectedExercises.push(qBack);
                            });
                        }
                    }
                    else {
                        var badError = "error fetching form from database, error: " + parsedResp.data;
                        alert(badError);
                    }
                });
            }
        });
    };
    EditPlanComponent.prototype.selectTest = function () {
        //console.log('selecting test');
        for (var _i = 0, _a = this.currentTestList; _i < _a.length; _i++) {
            var x = _a[_i];
            if (x.name == this.currentTest) {
                //console.log(x);
                this.selectedTests.push(x);
            }
        }
    };
    EditPlanComponent.prototype.selectExercise = function () {
        //console.log('selecgting exercise');
        for (var _i = 0, _a = this.currentExerciseList; _i < _a.length; _i++) {
            var x = _a[_i];
            if (x.name == this.currentExercise) {
                //console.log(x);
                this.selectedExercises.push(x);
            }
        }
    };
    EditPlanComponent.prototype.removeTest = function (qToRemove) {
        var index = this.selectedTests.indexOf(qToRemove, 0);
        if (index > -1) {
            this.selectedTests.splice(index, 1);
        }
    };
    EditPlanComponent.prototype.removeExercise = function (qToRemove) {
        var index = this.selectedExercises.indexOf(qToRemove, 0);
        if (index > -1) {
            this.selectedExercises.splice(index, 1);
        }
    };
    EditPlanComponent.prototype.updateRehabPlan = function () {
        //console.log("trying to submit");
        this.rehabPlan.exercises = [];
        this.rehabPlan.tests = [];
        for (var _i = 0, _a = this.selectedExercises; _i < _a.length; _i++) {
            var x = _a[_i];
            this.rehabPlan.exercises.push(x._id);
        }
        for (var _b = 0, _c = this.selectedTests; _b < _c.length; _b++) {
            var x = _c[_b];
            this.rehabPlan.tests.push(x._id);
        }
        if (this.rehabPlan.name == undefined) {
            alert('error: no name defined for this plan');
        }
        else {
            //console.log('rehab plan: ');
            //console.log(this.rehabPlan);
            // this.rehabManage.editPlan(this.rehabPlan).then( (response) => {
            //console.log(response);
            var parsedResp = JSON.parse(response._body);
            if (parsedResp.type) {
                alert('plan successfully updated');
                this.router.navigateByUrl('rehab-plan-select');
            }
            else {
                // of type was false, then means unsuccessful, so alert with error and stay on same page
                var errorMsg = "there was a problem creating the plan, error recieved: \n" + parsedResp.resp;
                alert(errorMsg);
            }
        }
        ;
    };
    EditPlanComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-plan',
            templateUrl: './edit-plan.component.html',
            styleUrls: ['./edit-plan.component.css']
        })
    ], EditPlanComponent);
    return EditPlanComponent;
}());
exports.EditPlanComponent = EditPlanComponent;
redirectSelect();
void {
    this: .router.navigateByUrl('/rehab-plan-select')
};
