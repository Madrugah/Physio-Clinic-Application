import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AssessmentFormManagerService {
 private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { } 

    // used to get a list of all forms created
    getForms(): Promise<any> {
        const url = `${environment.BASE_URL}/forms/SavedForm`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
    // used to get a single forms complete object based on its ID
    getSingleFormWithId(id): Promise<any> {
        let url = `${environment.BASE_URL}/forms/SavedForm/getsingle`;
        url = url+ '/'+ id;
        //console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
    // creates a new form based on the specifications of teh form given
    addForm(assessmentform): Promise<any> {
        const url = `${environment.BASE_URL}/forms/SavedForm`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, JSON.stringify(assessmentform), {headers: heads}).toPromise();
    }
    
    // edits an existing form, finding and updating based on the form passed
    editForm(assessmentform): Promise<any> {
        const url = `${environment.BASE_URL}/forms/SavedForm/edit`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, JSON.stringify(assessmentform), {headers: heads}).toPromise();
    }
    
    // deletes the given form using the id passed
  deleteForm(questionID): Promise<any> {
    let url = `${environment.BASE_URL}/forms/SavedForm/getsingle`;
    url = url + '/' + questionID;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.delete(url, {headers: heads}).toPromise();
  }
  
   
  
    
}
