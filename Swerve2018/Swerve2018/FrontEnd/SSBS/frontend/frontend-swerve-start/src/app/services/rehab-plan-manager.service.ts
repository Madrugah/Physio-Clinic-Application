import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class RehabPlanManagerService {
 private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { } 
  
  getPlans(): Promise<any> {//get all plans
        const url = `${environment.BASE_URL}/rehabilitationPlan/SavedRehabilitationPlan`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
    getSinglePlanWithId(id): Promise<any> {//get a single plan by id
        let url = `${environment.BASE_URL}/rehabilitationPlan/SavedRehabilitationPlan/getsingle`;
        url = url+ '/'+ id;
        //console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }
  
    addPlan(rehabPlan): Promise<any> {//add a rehab plab
        const url = `${environment.BASE_URL}/rehabilitationPlan/SavedRehabilitationPlan`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, JSON.stringify(rehabPlan), {headers: heads}).toPromise();
    }
  
   editPlan(rehabPlan): Promise<any> {//edit a plan based on plan
        const url = `${environment.BASE_URL}/rehabilitationPlan/SavedRehabilitationPlan/edit`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, JSON.stringify(rehabPlan), {headers: heads}).toPromise();
    } 
    editPlan2(rehabPlan, id): Promise<any> {//edit plan based on id
      //console.log(id);
      const data = {
          id: id,
          rehabPlan: rehabPlan,
        };
        const url = `${environment.BASE_URL}/rehabilitationPlan/SavedRehabilitationPlan/edit2`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, data, {headers: heads}).toPromise();
    } 
  
  deletePlan(questionID): Promise<any> {//delete plan based on id
    let url = `${environment.BASE_URL}/rehabilitationPlan/SavedRehabilitationPlan/getsingle`;
    url = url + '/' + questionID;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.delete(url, {headers: heads}).toPromise();
  }
  

  
}
