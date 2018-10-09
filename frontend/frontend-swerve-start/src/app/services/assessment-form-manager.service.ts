import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AssessmentFormManagerService {
 private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { } 

    getForms(): Promise<any> {
        const url = `${environment.BASE_URL}/forms/SavedForm`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
    getSingleFormWithId(id): Promise<any> {
        let url = `${environment.BASE_URL}/forms/SavedForm/getsingle`;
        url = url+ '/'+ id;
        console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }
    
    addForm(assessmentform): Promise<any> {
        const url = `${environment.BASE_URL}/forms/SavedForm`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, JSON.stringify(assessmentform), {headers: heads}).toPromise();
    }
    
    editForm(assessmentform): Promise<any> {
        const url = `${environment.BASE_URL}/forms/SavedForm/edit`;
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        }); 
        return this.http.post(url, JSON.stringify(assessmentform), {headers: heads}).toPromise();
    }
    
  deleteForm(questionID): Promise<any> {
    let url = `${environment.BASE_URL}/forms/SavedForm/getsingle`;
    url = url + '/' + questionID;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.delete(url, {headers: heads}).toPromise();
  }
  
   
  
    
}
