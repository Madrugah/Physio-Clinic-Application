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
var RehabPlanManagerService = (function () {
    function RehabPlanManagerService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    RehabPlanManagerService.prototype.getPlans = function () {
        var url = environment_1.environment.BASE_URL + "/rehabilitationPlan/SavedRehabilitationPlan";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, { headers: heads }).toPromise();
    };
    RehabPlanManagerService.prototype.getSinglePlanWithId = function (id) {
        var url = environment_1.environment.BASE_URL + "/rehabilitationPlan/SavedRehabilitationPlan/getsingle";
        url = url + '/' + id;
        //console.log(url);
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, { headers: heads }).toPromise();
    };
    RehabPlanManagerService.prototype.addPlan = function (rehabPlan) {
        var url = environment_1.environment.BASE_URL + "/rehabilitationPlan/SavedRehabilitationPlan";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, JSON.stringify(rehabPlan), { headers: heads }).toPromise();
    };
    RehabPlanManagerService.prototype.editPlan = function (rehabPlan) {
        var url = environment_1.environment.BASE_URL + "/rehabilitationPlan/SavedRehabilitationPlan/edit";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, JSON.stringify(rehabPlan), { headers: heads }).toPromise();
    };
    RehabPlanManagerService.prototype.deletePlan = function (questionID) {
        var url = environment_1.environment.BASE_URL + "/rehabilitationPlan/SavedRehabilitationPlan/getsingle";
        url = url + '/' + questionID;
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.delete(url, { headers: heads }).toPromise();
    };
    RehabPlanManagerService = __decorate([
        core_1.Injectable()
    ], RehabPlanManagerService);
    return RehabPlanManagerService;
}());
exports.RehabPlanManagerService = RehabPlanManagerService;
