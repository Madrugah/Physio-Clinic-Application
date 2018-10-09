import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class QuestionMakerService {
 private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

//  getTutorInfo(): Promise<any> {
//     const url = `${environment.BASE_URL}/unapprovedAccounts`;
//     const heads: Headers = new Headers({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.get(url, {headers: heads}).toPromise();
//   }

getQuestions(): Promise<any> {//get questions
    const url = `${environment.BASE_URL}/questions/SavedQuestions`;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    //console.log(url);
    return this.http.get(url, {headers: heads}).toPromise();
  }

addQuestion(question): Promise<any> {//add question to questions
    const url = `${environment.BASE_URL}/questions/SavedQuestions`;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.post(url, JSON.stringify(question), {headers: heads}).toPromise();
  }

editQuestion(id, question): Promise<any> {//edit a single question by id
    let url = `${environment.BASE_URL}/questions/SavedQuestions/changeSingle`;
    url = url + '/' + id;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.post(url, JSON.stringify(question), {headers: heads}).toPromise();
  }

  
  deleteQuestion(questionID): Promise<any> {//delete question by id
    let url = `${environment.BASE_URL}/questions/SavedQuestions/getsingle`;
    url = url + '/' + questionID;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.delete(url, {headers: heads}).toPromise();
  }
  
  getSingleQuestionWithId(id): Promise<any> {//get single question by id
        let url = `${environment.BASE_URL}/questions/SavedQuestions/getsingle`;
        url = url+ '/'+ id;
        //console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }

getSingleQuestionType(id): Promise<any> {//get single question by id
        let url = `${environment.BASE_URL}/questions/QuestionType/getsingle`;
        url = url+ '/'+ id;
        //console.log(url);
        const heads: Headers = new Headers({
          'Content-Type': 'application/json'
        });
        //console.log(url);
        return this.http.get(url, {headers: heads}).toPromise();
    }


 getQuestionTypes(): Promise<any> {//get question types
    const url = `${environment.BASE_URL}/questions/QuestionType`;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, {headers: heads}).toPromise();
  }

 addQuestionType(qType): Promise<any> {//add a new question type
    const url = `${environment.BASE_URL}/questions/QuestionType`;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.post(url, JSON.stringify(qType), {headers: heads}).toPromise();
  }

  deleteQuestionType(typeID): Promise<any> {//delete question type by id
    let url = `${environment.BASE_URL}/questions/QuestionType/getsingle`;
    url = url + '/' + typeID;
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    return this.http.delete(url, {headers: heads}).toPromise();
  }
  
} 