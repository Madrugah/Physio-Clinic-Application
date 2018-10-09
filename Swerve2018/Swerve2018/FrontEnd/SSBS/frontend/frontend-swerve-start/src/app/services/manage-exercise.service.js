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
var ManageExerciseService = (function () {
    function ManageExerciseService(http) {
        this.http = http;
    }
    // do POST request on creation
    ManageExerciseService.prototype.createExercise = function (callback_fun, form) {
        this.http.post(environment_1.environment.BASE_URL + "/exercises", form).subscribe(function (data) {
            var x = data;
            //console.log(x);
            callback_fun(x);
        });
    };
    ManageExerciseService.prototype.getExercises = function (callback_fun) {
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.http.get(environment_1.environment.BASE_URL + "/exercises", { headers: this.headers }).subscribe(function (data) {
            var x = data;
            var obj = JSON.parse(x._body);
            callback_fun(obj);
        });
    };
    ManageExerciseService.prototype.getSingleExercise = function (id, callback_fun) {
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var url = (environment_1.environment.BASE_URL + "/exercises/") + id;
        //console.log(url);
        this.http.get(url, { headers: this.headers }).subscribe(function (data) {
            //console.log(data);
            var x = data;
            var obj = JSON.parse(x._body);
            callback_fun(obj);
        });
    };
    ManageExerciseService.prototype.deleteExercise = function (callback_fun, id) {
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.http.delete((environment_1.environment.BASE_URL + "/exercises/") + id, { headers: this.headers }).subscribe(function (data) {
            var x = data;
            var obj = JSON.parse(x._body);
            //console.log(obj);
            callback_fun(obj.exercise.name);
        });
    };
    ManageExerciseService = __decorate([
        core_1.Injectable()
    ], ManageExerciseService);
    return ManageExerciseService;
}());
exports.ManageExerciseService = ManageExerciseService;
