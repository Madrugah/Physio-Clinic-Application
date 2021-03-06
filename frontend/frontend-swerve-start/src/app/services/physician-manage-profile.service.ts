import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Injectable()
export class PhysicianManageProfileService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
  }


  
    createProfile(form: any): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/createProfile`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        console.log(url);
        return this.http.post(url, JSON.stringify(form), {headers: heads}).toPromise();
    }  
    
    createProfileAdmin(form: any): Promise<any> {
    const url = `${environment.BASE_URL}/patientProfile/createProfileAdmin`;
    const heads: Headers = new Headers({
          'Content-Type': 'application/json'
    }); 
        console.log(url);
        return this.http.post(url, JSON.stringify(form), {headers: heads}).toPromise();
    }  
    
    createProfilePhys(form: any): Promise<any> {
    const url = `${environment.BASE_URL}/patientProfile/createProfilePhys`;
    const heads: Headers = new Headers({
          'Content-Type': 'application/json'
    }); 
        console.log(url);
        return this.http.post(url, JSON.stringify(form), {headers: heads}).toPromise();
    }  
    
    createAccountAndProfile(form: any): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/createProfile`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        console.log(url);
        return this.http.post(url, JSON.stringify(form), {headers: heads}).toPromise();
    }  
    
    checkEmail(email:any): Promise<any> {
        var url = `${environment.BASE_URL}/patientProfile/email`;
        url=url+'/'+email
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }  
    
    
    getProfiles(): Promise<any>{
    const url = `${environment.BASE_URL}/patientProfile/getProfile`;
        console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
    retrieveProfile(email): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/retrieveProfile`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        console.log(url);
        console.log(email);
        return this.http.post(url, '{"email": "' + email + '"}', {headers: heads}).toPromise();
    } 
    
    retrieveProfile1(token): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/retrieveProfile1`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        const data = {
          token: token,
        };
        return this.http.post(url, data, {headers: heads}).toPromise();
    } 
    
    retrieveProfile2(token): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/retrieveProfile2`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        const data = {
          token: token,
        };
        return this.http.post(url, data, {headers: heads}).toPromise();
    } 

      editProfile(form: any, token): Promise<any> {

        const data = {
          form: form,
          token: token,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/updateProfile`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        // console.log(v3);
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
      editProfile2(form: any, email): Promise<any> {

        const data = {
          form: form,
          email: email,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/updateProfile2`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        // console.log(v3);
        return this.http.post(url, data, {headers: heads}).toPromise();
    } 
    
    
    updatePass(pass, oldPass, email): Promise<any>{
      const data = {
          newPass: pass,
          oldPass: oldPass,
          email: email,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/updatePass`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }

    updatePassAdmin(pass, email): Promise<any>{
      const data = {
          newPass: pass,
          email: email,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/updatePass2`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    getInfo(): Promise<any>{
    const url = `${environment.BASE_URL}/patientProfile/getInfo`;
        console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
      assignPlan(planId, userEmail): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/addPlan`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        
        return this.http.post(url, {email: userEmail, planId: planId}, {headers: heads}).toPromise();
    }
      postPictures(pics, userEmail): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/addPics`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        
        return this.http.post(url, {email: userEmail, pics: pics}, {headers: heads}).toPromise();
    } 
      postNote(notes, userEmail): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/addNote`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        
        return this.http.post(url, {email: userEmail, note: notes}, {headers: heads}).toPromise();
    }  
    removeNote(note,userEmail){
        const url = `${environment.BASE_URL}/patientProfile/removeNote`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 

        return this.http.post(url, {email: userEmail, note: note}, {headers: heads}).toPromise(); 
    }
    
    removePlan(planId,userEmail){
        const url = `${environment.BASE_URL}/patientProfile/removePlan`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        
        return this.http.post(url, {email: userEmail, planId: planId}, {headers: heads}).toPromise(); 
    }
    
    deleteAcc(email): Promise<any>{
      const data = {
          email: email,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/deleteAcc`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    checker(email): Promise<any>{
      const data = {
          email: email,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/checker`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    getToken(email): Promise<any>{
      const data = {
          email: email,
        };
        
        const url = `${environment.BASE_URL}/patientProfile/getToken`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    }    
}

