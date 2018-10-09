import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment'; 

@Injectable()
export class AuthManageService {
  public loginStatus: false;

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

    login(form: any): Promise<any> {
        const url = `${environment.BASE_URL}/auth/authenticate`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        console.log(url);
        return this.http.post(url, JSON.stringify(form), {headers: heads}).toPromise();
    }  
    
    validate(): Promise<any> {
     let token = localStorage.getItem('token');
     //console.log(token);
        const data = {
          token: token,
        };
        console.log(data);
      const url = `${environment.BASE_URL}/auth/validate`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
      
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
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
    
    checkProfileCompletion(): Promise<any> {
     let token = localStorage.getItem('token');
     console.log(token);
        const data = {
          token: token,
        };
        console.log(data);
      const url = `${environment.BASE_URL}/auth/completedProfile`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
      
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    confirmUser(): Promise<any> {
     let token = localStorage.getItem('token');
     console.log(token);
        const data = {
          token: token,
        };
        console.log(data);
      const url = `${environment.BASE_URL}/auth/confirmUser`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
      
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
     isReset(): Promise<any> {
     let token = localStorage.getItem('token');
        const data = {
          token: token,
        };
        console.log(data);
      const url = `${environment.BASE_URL}/auth/isReset`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }

}
