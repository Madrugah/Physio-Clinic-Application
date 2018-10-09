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
var AuthManageService = (function () {
    function AuthManageService(http) {
        this.http = http;
        this.loginStatus = false;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AuthManageService.prototype.login = function (form) {
        var url = environment_1.environment.BASE_URL + "/auth/authenticate";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        console.log(url);
        return this.http.post(url, JSON.stringify(form), { headers: heads }).toPromise();
    };
    AuthManageService.prototype.validate = function () {
        var token = localStorage.getItem('token');
        //console.log(token);
        var data = {
            token: token
        };
        console.log(data);
        var url = environment_1.environment.BASE_URL + "/auth/validate";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, data, { headers: heads }).toPromise();
    };
    // validate2(): Promise<any> {
    // let token = localStorage.getItem('token');
    // console.log(token);
    //     const data = {
    //       token: token,
    //     };
    //     console.log(data);
    //   const url = `${environment.BASE_URL}/auth/validate2`;
    //   const heads: Headers = new Headers({
    //       'Content-Type': 'application/json'
    //   }); 
    //     return this.http.post(url, data, {headers: heads}).toPromise();
    // }
    AuthManageService.prototype.checkProfileCompletion = function () {
        var token = localStorage.getItem('token');
        console.log(token);
        var data = {
            token: token
        };
        console.log(data);
        var url = environment_1.environment.BASE_URL + "/auth/completedProfile";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, data, { headers: heads }).toPromise();
    };
    AuthManageService.prototype.confirmUser = function () {
        var token = localStorage.getItem('token');
        console.log(token);
        var data = {
            token: token
        };
        console.log(data);
        var url = environment_1.environment.BASE_URL + "/auth/confirmUser";
        var heads = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, data, { headers: heads }).toPromise();
    };
    AuthManageService = __decorate([
        core_1.Injectable()
    ], AuthManageService);
    return AuthManageService;
}());
exports.AuthManageService = AuthManageService;
