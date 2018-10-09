import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment'; 

@Injectable()
export class AuthManageService {
  public loginStatus: false;

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

    // used to login an account, returns a token that can be assigned to localstorage
    login(form: any): Promise<any> {
        const url = `${environment.BASE_URL}/auth/authenticate`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        //console.log(url);
        return this.http.post(url, JSON.stringify(form), {headers: heads}).toPromise();
    }  
    
    // used to validate an account based on its token and return its access rights
    validate(): Promise<any> {
     let token = localStorage.getItem('token');
     //console.log(token);
        const data = {
          token: token,
        };
        //console.log(data);
      const url = `${environment.BASE_URL}/auth/validate`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
      
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
     
    // checks to see if a user has entered all teh needed information ot complete their profile, unlocking the rest of the sites functionality
    checkProfileCompletion(): Promise<any> {
     let token = localStorage.getItem('token');
     //console.log(token);
        const data = {
          token: token,
        };
        //console.log(data);
      const url = `${environment.BASE_URL}/auth/completedProfile`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
      
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    // confirms a use
    confirmUser(): Promise<any> {
     let token = localStorage.getItem('token');
     //console.log(token);
        const data = {
          token: token,
        };
        //console.log(data);
      const url = `${environment.BASE_URL}/auth/confirmUser`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
      
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    // checks if a reset has occured
     isReset(): Promise<any> {
     let token = localStorage.getItem('token');
        const data = {
          token: token,
        };
        //console.log(data);
      const url = `${environment.BASE_URL}/auth/isReset`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    // populates the title page, retreiving the specs form the backend
    populateTitlePage(): Promise<any> {
      const url = `${environment.BASE_URL}/auth/getTitlePage`;
      const heads: Headers = new Headers({
          'Content-Type': 'application/json'
      }); 
        return this.http.post(url, {}, {headers: heads}).toPromise();
    }
    

}
