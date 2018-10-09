import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';


@Injectable()
export class SchedulerService {

  constructor(private http: Http) { }
  headers;
  // do POST request on creation
  createAppointment(callback_fun, form: any){
      //console.log("Can you hit this?");
      this.http.post(`${environment.BASE_URL}/appointments`, form).subscribe(data => { //check if session still valid
      let x: any = data;
      console.log(x);
      callback_fun(x); 
    });
  }
   getAppointments(callback_fun, token){
       this.headers = new Headers({ 'Content-Type': 'application/json' });
       var url =`${environment.BASE_URL}/appointments/get/`+ token;
       this.http.get(url, {headers: this.headers}).subscribe(data => { //check if session still valid
       let x: any = data;
       var obj = JSON.parse(x._body);
    //   console.log(obj.appointments);
       let Apps: Appointment[] = [];
       for(let i = 0; i<obj.appointments.length; i++){
           Apps[i]={
                id: obj.appointments[i]._id,
                title: obj.appointments[i].title,
                description: obj.appointments[i].description,
                state: obj.appointments[i].state,
                Patient: obj.appointments[i].Patient,
                Physician: obj.appointments[i].Physician,
                startDate: new Date(obj.appointments[i].dates[2],
                                    obj.appointments[i].dates[0],
                                    obj.appointments[i].dates[1],
                                    obj.appointments[i].dates[3],
                                    obj.appointments[i].dates[4]),
                endDate: new Date(obj.appointments[i].dates[2],
                                    obj.appointments[i].dates[0],
                                    obj.appointments[i].dates[1],
                                    obj.appointments[i].dates[5],
                                    obj.appointments[i].dates[6]),
                givenName: obj.appointments[i].givenName,
                familyName: obj.appointments[i].familyName
 
                                    
            }   
            if(!(Apps[i].Physician==localStorage.getItem('token')||Apps[i].Patient==localStorage.getItem('token'))){
              if(Apps[i].state==1){
                Apps[i].state=0;
                Apps[i].title= "Block";
                Apps[i].description= "This time was blocked by the physician";
              }
              if(Apps[i].state==2){
                Apps[i].state=3;
                Apps[i].title= "This was requested by a fellow patient";
                Apps[i].description= "a request was made";
              }
            }
       }
       //console.log(Apps);
       callback_fun(Apps); 
     });
   }
      getMyAppointments(callback_fun, token){
       this.headers = new Headers({ 'Content-Type': 'application/json' });
       var url =`${environment.BASE_URL}/appointments/getMy/`+ token;
       this.http.get(url, {headers: this.headers}).subscribe(data => { //check if session still valid
       let x: any = data;
       var obj = JSON.parse(x._body);
    //   console.log(obj.appointments);
       let Apps: Appointment[] = [];
       for(let i = 0; i<obj.appointments.length; i++){
           Apps[i]={
                id: obj.appointments[i]._id,
                title: obj.appointments[i].title,
                description: obj.appointments[i].description,
                state: obj.appointments[i].state,
                Patient: obj.appointments[i].Patient,
                Physician: obj.appointments[i].Physician,
                startDate: new Date(obj.appointments[i].dates[2],
                                    obj.appointments[i].dates[0],
                                    obj.appointments[i].dates[1],
                                    obj.appointments[i].dates[3],
                                    obj.appointments[i].dates[4]),
                endDate: new Date(obj.appointments[i].dates[2],
                                    obj.appointments[i].dates[0],
                                    obj.appointments[i].dates[1],
                                    obj.appointments[i].dates[5],
                                    obj.appointments[i].dates[6]),
                givenName: obj.appointments[i].givenName,
                familyName: obj.appointments[i].familyName
 
                                    
            }   
            if(!(Apps[i].Physician==localStorage.getItem('token')||Apps[i].Patient==localStorage.getItem('token'))){
              if(Apps[i].state==1){
                Apps[i].state=0;
                Apps[i].title= "Block";
                Apps[i].description= "This time was blocked by the physician";
              }
              if(Apps[i].state==2){
                Apps[i].state=3;
                Apps[i].title= "This was requested by a fellow patient";
                Apps[i].description= "a request was made";
              }
            }
       }
       //console.log(Apps);
       callback_fun(Apps); 
     });
   }
     getPhysicians(callback_fun){
       this.headers = new Headers({ 'Content-Type': 'application/json' });
       var url =`${environment.BASE_URL}/patientProfile/getPhysicians`;
       this.http.get(url, {headers: this.headers}).subscribe(data => { //check if session still valid
       let x: any = data;
       var obj = JSON.parse(x._body);
       //console.log(obj.data);
       let physicians : Physician[] = [];
       let k=0;
      for(let i = 0; i<obj.data.length; i++){
          if(obj.data[i].givenName==undefined){
            k++;
            continue;
          }
          physicians[i-k]={
                first: obj.data[i].givenName,
                last: obj.data[i].familyName,
                token: obj.data[i].token
            }   
      }
      //console.log(Apps);
      callback_fun(physicians); 
     });
   }
   getSingleAppointment(id, callback_fun){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      let url =`${environment.BASE_URL}/appointments/` + id;
      console.log(url);
      this.http.get(url, {headers: this.headers}).subscribe(data => { //check if session still valid
      console.log(data);
      let x: any = data;
      var obj = JSON.parse(x._body);
      callback_fun(obj); 
    });
  }
  
  deleteAppointment(callback_fun, id){
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.delete(`${environment.BASE_URL}/appointments/`+id, {headers: this.headers}).subscribe(data => { //check if session still valid
      let x: any = data;
      var obj = JSON.parse(x._body);
      console.log(obj);
      callback_fun(obj.appointment.name); 
    });
  }

    // getAppointments() {
    //     this.getappointments2();
    //     return Appointments;
    // }
    getStates(){
        return states;
    }

}



export class Physician {
    first: Number;
    last: Number;
    token: String;
    
}

export class State {
    id: Number;
    color: String;
    
}

let states: State[] = [
    {
        id: 0,
        color: "#DB0000"//blocked
    }, {
        id: 1,
        color: "#33DB00"//confirmed
    }, {
        id: 2,
        color: "#FFE500"//pending
    }, {
        id: 3,
        color: "#F2B021"//pending
    }
];

export class Appointment {
    id?:String;
    title: String;
    description: String;
    state: Number;
    Patient: String;
    Physician: String;
    startDate: Date;
    endDate: Date;
    givenName?: String;
    familyName?: String;
    
}

let Appointments: Appointment[] = [{
        title: 'noah',
        description: 'hello',
        state: 0,
        Patient: '0',
        Physician: '0',
        startDate: new Date(2018, 4, 24, 9, 10),
        endDate: new Date(2018, 4, 24, 11, 1)
    }, {
        title: 'noah',
        description: 'hello',
        state: 1,
        Patient: '0',
        Physician: '0',
        startDate: new Date(2018, 4, 24, 14, 10),
        endDate: new Date(2018, 4, 24, 16, 1)
    }
];