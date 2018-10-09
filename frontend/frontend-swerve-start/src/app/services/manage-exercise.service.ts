import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';


@Injectable()
export class ManageExerciseService {

  constructor(private http: Http) { }
  headers;
  // do POST request on creation
  createExercise(callback_fun, form: any){
      this.http.post(`${environment.BASE_URL}/exercises`, form).subscribe(data => { //check if session still valid
      let x: any = data;
      console.log(x);
      callback_fun(x); 
    });
  }
  getExercises(callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.get(`${environment.BASE_URL}/exercises`, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
  getExercisesNoPic(callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.put(`${environment.BASE_URL}/exercises`, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
   getSingleExercise(id, callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      let url =`${environment.BASE_URL}/exercises/` + id;
      console.log(url);
      this.http.get(url, {headers: this.headers}).subscribe(data => { //check if session still valid
      console.log(data);
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
  
  deleteExercise(callback_fun, id){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.delete(`${environment.BASE_URL}/exercises/`+id, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      console.log(obj);
      callback_fun(obj.exercise.name); 
    });
  }
  // createExercise(): Promise<any> {
  //   const url = `${environment.BASE_URL}/exercise/createExercise`;
  //   const heads: Headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post
  // }
  
  // do GET request to retrieve exercise by a given id
  // getExercise(callback_fun, id: int){
  //   // baseURL ==> swerve-start-qmadruga.c9users.io:8080
    
  //     this.http.get('https://swerve-start-qmadruga.c9users.io:8080/exercises/' + id).subscribe(data => { //check if session still valid
  //     let x: any = data;
  //     console.log("hello");
  //     console.log(x);
  //     callback_fun(x); 
  //   });
  // }
  
  // getExercises(): Promise<any> {
  //   const url = `${environment.BASE_URL}/exercise/getExercises`;
  //   const heads: Headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.get(url, {headers: heads}).toPromise();
  // }
  
  // createExercise(): Promise<any> {
  //   const url = `${environment.BASE_URL}/exercise/createExercise`;
  //   const heads: Headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   // do POST to route
  // }
 
}
