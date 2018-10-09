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
      //console.log(x);
      callback_fun(x); 
    });
  }
  // does a get request to return all exercises that have been created
  getExercises(callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.get(`${environment.BASE_URL}/exercises`, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
  
  // gets the exercises with no pictures
  getExercisesNoPic(callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.put(`${environment.BASE_URL}/exercises`, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
  // gets a single exercise using the ID
   getSingleExercise(id, callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      let url =`${environment.BASE_URL}/exercises/` + id;
      //console.log(url);
      this.http.get(url, {headers: this.headers}).subscribe(data => { //check if session still valid
      //console.log(data);
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
  // deletes the exercise
  deleteExercise(callback_fun, id){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.delete(`${environment.BASE_URL}/exercises/`+id, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      //console.log(obj);
      callback_fun(obj.exercise.name); 
    });
  } 
 
}
