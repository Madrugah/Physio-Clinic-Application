import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PatientFunctionsManageService {


  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

// used to submit a completed test to a users profile
  submitTest(completedTestToSend): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/completeTest`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log('submiting test');
        //console.log(completedTestToSend);
        return this.http.post(url, JSON.stringify(completedTestToSend), {headers: heads}).toPromise();
    }
    
    // used to make visualizations later
    rateHealth(rating, time): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/rateHealth`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
         let token = localStorage.getItem('token');
        //console.log('submiting health rating');
        //console.log(rating + " scored, at time: " + time);
        const data ={
          rating: rating,
          time: time,
          token: token
        }
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    // returns all tests completed by that user
    getCompletedTests(): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/completeTest`;
         let token = localStorage.getItem('token');
        //console.log(token);
        const data = {
          token: token,
        };
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log('grabbing all tests done for token:');
        //console.log(data);
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    // gets the users ratings to visualize their progress report with
    getHealthRatings(email): Promise<any> {
        const url = `${environment.BASE_URL}/patientProfile/getHealthRatings`;
         let token = localStorage.getItem('token');
        //console.log(token);
        const data = {
          email: email,
        };
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log('grabbing all ratings done for email:');
        //console.log(email);
        return this.http.post(url, data, {headers: heads}).toPromise();
    }
    
    // used to send a new message as a phyisican, or a user account
    sendNewMessage(message): Promise<any> {
      // using token, so we can get the name the same if they are admin, or if the are the patient
      // also need to send email so we can tie it to account
      const url = `${environment.BASE_URL}/patientProfile/sendMessage`;
      const heads: Headers = new Headers({
        'Content-Type': 'application/json'
      });
      return this.http.post(url, message, {headers:  heads}).toPromise();
    }

    // used to get all messages bound to a user account
    getMessages(s): Promise<any> {
      // using token, so we can get the name the same if they are admin, or if the are the patient
      // also need to send email so we can tie it to account
      //console.log(s)
      const url = `${environment.BASE_URL}/patientProfile/getEmailMessages`;
      const heads: Headers = new Headers({
        'Content-Type': 'application/json'
      });
      return this.http.post(url, s, {headers:  heads}).toPromise();
    }
    // used to mark a message as viewed, so it doesnt appear on new messages pane
    markMessageViewed(id:any): Promise<any> {
        var url = `${environment.BASE_URL}/patientProfile/setViewed`;
        url=url+'/'+id
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }  
    // used to get all pending messages
    getPendingMessages(): Promise<any> {
        //console.log("pending messages")
        var url = `${environment.BASE_URL}/patientProfile/unviewed`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }  
}
