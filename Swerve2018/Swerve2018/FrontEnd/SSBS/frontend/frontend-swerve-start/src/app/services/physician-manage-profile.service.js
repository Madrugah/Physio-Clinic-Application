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
var PhysicianManageProfileService = (function () {
    function PhysicianManageProfileService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    PhysicianManageProfileService.prototype.createProfile = function (form) {
        var url = environment_1.environment.BASE_URL + "/patientProfile/createProfile";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.post(url, JSON.stringify(form), { headers: heads }).toPromise();
    };
    PhysicianManageProfileService.prototype.getProfiles = function () {
        var url = environment_1.environment.BASE_URL + "/patientProfile/getProfile";
        //console.log(url);
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get(url, { headers: heads }).toPromise();
    };
    PhysicianManageProfileService.prototype.retrieveProfile = function (email) {
        var url = environment_1.environment.BASE_URL + "/patientProfile/retrieveProfile";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        //console.log(url);
        //console.log(email);
        return this.http.post(url, '{"email": "' + email + '"}', { headers: heads }).toPromise();
    };
    PhysicianManageProfileService.prototype.editProfile = function (form, token) {
        var data = {
            form: form,
            token: token
        };
        var url = environment_1.environment.BASE_URL + "/patientProfile/updateProfile";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        // //console.log(v3);
        return this.http.post(url, data, { headers: heads }).toPromise();
    };
    PhysicianManageProfileService.prototype.getInfo = function () {
        var url = environment_1.environment.BASE_URL + "/patientProfile/getInfo";
        //console.log(url);
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get(url, { headers: heads }).toPromise();
    };
    PhysicianManageProfileService = __decorate([
        core_1.Injectable()
    ], PhysicianManageProfileService);
    return PhysicianManageProfileService;
}());
exports.PhysicianManageProfileService = PhysicianManageProfileService;
