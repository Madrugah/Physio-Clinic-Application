"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WriteTestComponent = (function () {
    function WriteTestComponent(router, route, physicianTools) {
        this.router = router;
        this.route = route;
        this.physicianTools = physicianTools;
    }
    WriteTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.testid = this.route.snapshot.params.testid;
        //fetching the test questions
        console.log(this.testid);
        if (this.testid == undefined) {
            alert("error finding form to edit");
        }
        else {
            this.questionMaker.getQuestions().then(function (qs) {
                var parsedout = JSON.parse(qs._body);
                _this.availableQuestions = parsedout.questionsRecieved;
            });
            this.assesmentMaker.getSingleFormWithId(this.editId).then(function (response) {
                var parsedResp = JSON.parse(response._body);
                if (parsedResp.type) {
                    console.log(parsedResp);
                    _this.selectedQuestions = []; // init blank array to put questions fetched into
                    _this.questionsToFetch = parsedResp.data.questions;
                    _this.assessmentform.name = parsedResp.data.name;
                    _this.assessmentform.description = parsedResp.data.description;
                    for (var _i = 0, _a = _this.questionsToFetch; _i < _a.length; _i++) {
                        var questionId = _a[_i];
                        _this.questionMaker.getSingleQuestionWithId(questionId).then(function (qBack) {
                            var parsedqBack = JSON.parse(qBack._body);
                            _this.selectedQuestions.push(parsedqBack.data);
                        });
                    }
                }
                else {
                    var badError = "error fetching form from database, error: " + parsedResp.data;
                    alert(badError);
                }
            });
        }
    };
    WriteTestComponent = __decorate([
        core_1.Component({
            selector: 'app-write-test',
            templateUrl: './write-test.component.html',
            styleUrls: ['./write-test.component.css']
        })
    ], WriteTestComponent);
    return WriteTestComponent;
}());
exports.WriteTestComponent = WriteTestComponent;
