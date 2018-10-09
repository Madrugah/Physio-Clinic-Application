"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var environment_1 = require('../../environments/environment');
var QuestionMakerService = (function () {
    function QuestionMakerService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //  getTutorInfo(): Promise<any> {
    //     const url = `${environment.BASE_URL}/unapprovedAccounts`;
    //     const heads: Headers = new Headers({
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     });
    //     return this.http.get(url, {headers: heads}).toPromise();
    //   }
    QuestionMakerService.prototype.getQuestions = function () {
        var url = environment_1.environment.BASE_URL + "/questions/SavedQuestions";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        console.log(url);
        return this.http.get(url, { headers: heads }).toPromise();
    };
    QuestionMakerService.prototype.addQuestion = function (question) {
        var url = environment_1.environment.BASE_URL + "/questions/SavedQuestions";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, JSON.stringify(question), { headers: heads }).toPromise();
    };
    QuestionMakerService.prototype.deleteQuestion = function (questionID) {
        var url = environment_1.environment.BASE_URL + "/questions/SavedQuestions/getsingle";
        url = url + '/' + questionID;
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.delete(url, { headers: heads }).toPromise();
    };
    QuestionMakerService.prototype.getSingleQuestionWithId = function (id) {
        var url = environment_1.environment.BASE_URL + "/questions/SavedQuestions/getsingle";
        url = url + '/' + id;
        console.log(url);
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        console.log(url);
        return this.http.get(url, { headers: heads }).toPromise();
    };
    QuestionMakerService.prototype.getSingleQuestionType = function (id) {
        var url = environment_1.environment.BASE_URL + "/questions/QuestionType/getsingle";
        url = url + '/' + id;
        console.log(url);
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        console.log(url);
        return this.http.get(url, { headers: heads }).toPromise();
    };
    QuestionMakerService.prototype.getQuestionTypes = function () {
        var url = environment_1.environment.BASE_URL + "/questions/QuestionType";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get(url, { headers: heads }).toPromise();
    };
    QuestionMakerService.prototype.addQuestionType = function (qType) {
        var url = environment_1.environment.BASE_URL + "/questions/QuestionType";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, JSON.stringify(qType), { headers: heads }).toPromise();
    };
    QuestionMakerService = __decorate([
        core_1.Injectable()
    ], QuestionMakerService);
    return QuestionMakerService;
}());
exports.QuestionMakerService = QuestionMakerService;
