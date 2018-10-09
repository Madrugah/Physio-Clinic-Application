import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { SchedulerService, Appointment, State } from '../../../services/scheduler.service';
import {  PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scheduler-dialog',
  templateUrl: './scheduler-dialog.component.html',
  styleUrls: ['./scheduler-dialog.component.css']
})
export class SchedulerDialogComponent implements OnInit {
  SchedulerDialogRef: MatDialogRef<SchedulerDialogComponent>;
  editable=false;
  date;
  Hours=['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  Minutes=['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  appointmentForm = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    startHour: new FormControl('', [Validators.required]),
    startMinute: new FormControl('', [Validators.required]),
    startTiming: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
    endMinute: new FormControl('', [Validators.required]),
    endTiming: new FormControl('', [Validators.required])
  });  

  constructor(private schedulerService: SchedulerService, 
              private route: ActivatedRoute, 
              private physService: PhysicianManageProfileService,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) { 
    //console.log('Data for dialog update: ');
    //console.log(this.data);
    if(this.data.data.Physician==undefined){//set physician for schedule
      this.data.data.Physician =this.data.Physician;
    }
    if(this.data.data.state!=0 && this.data.data.state!=3){//make editable
      this.editable=true;
    }
    if(this.data.data.title){//set title
     this.appointmentForm.controls.title.setValue(this.data.data.title); 
     this.appointmentForm.controls.description.setValue(this.data.data.description); 
    }
    if (this.data.data.startDate.getHours()<12){
      this.appointmentForm.controls.startTiming.setValue(0);
    }else{
      this.appointmentForm.controls.startTiming.setValue(1);
    }
    if (this.data.data.endDate.getHours()<12){
      this.appointmentForm.controls.endTiming.setValue(0);
    }else{
      this.appointmentForm.controls.endTiming.setValue(1);
    }
    this.appointmentForm.controls.startHour.setValue(this.data.data.startDate.getHours()%12);
    this.appointmentForm.controls.startMinute.setValue(this.data.data.startDate.getMinutes()/5);
    this.appointmentForm.controls.endHour.setValue(this.data.data.endDate.getHours()%12);
    this.appointmentForm.controls.endMinute.setValue(this.data.data.endDate.getMinutes()/5);
    this.date=Days[this.data.data.startDate.getDay()]+', '
    this.date+=this.data.data.startDate.getDate() +' ' 
    this.date+= Months[this.data.data.startDate.getMonth()] + ' '+ this.data.data.startDate.getFullYear();
  }
  
  ngOnInit() {
    // this.appointmentForm.controls.startHour.setValue(this.update.controls.startHour);
  }

  allDay(){//set time for all day
    this.appointmentForm.controls.startHour.setValue(9);
    this.appointmentForm.controls.startMinute.setValue(1);
    this.appointmentForm.controls.startTiming.setValue(0);
    this.appointmentForm.controls.endHour.setValue(7);
    this.appointmentForm.controls.endMinute.setValue(11);
    this.appointmentForm.controls.endTiming.setValue(1);
    this.submitBlock();
  }
  submitBlock(){//block appointment slots
    //console.log(this.appointmentForm);
    var block={
      _id: undefined,
      title: "This time was blocked by the physician",
      dates: [],
      description: "This time was marked as busy by your physician",
      state:0,
      Patient: 0,
      Physician: localStorage.getItem('token')
    }
    if (this.data.data.id!=undefined){
      block._id=this.data.data.id;
    }
    block.dates=[
        this.data.data.startDate.getMonth(),
        this.data.data.startDate.getDate(),
        this.data.data.startDate.getFullYear()
      ];//that should be injected
    block.dates[3]= this.appointmentForm.value.startHour+(this.appointmentForm.value.startTiming*12);
    block.dates[4]= this.appointmentForm.value.startMinute*5;
    block.dates[5]= this.appointmentForm.value.endHour+(this.appointmentForm.value.endTiming*12);
    block.dates[6]= this.appointmentForm.value.endMinute*5;
    //console.log(block);
    this.schedulerService.createAppointment(this.onResponse.bind(this), block)
    
  }
    submitAppointmentRequest(){//submit a request for an appointment
    var email = this.data.Email;
    //console.log("appointment email is: " + email);
    this.physService.getToken(email).then((respond) => {
      const obj = JSON.parse(respond._body)
      //console.log(obj);
      
      //console.log(this.appointmentForm);
      var request={
        _id: undefined,
        title : this.appointmentForm.value.title,
        dates: [],
        description: this.appointmentForm.value.description,
        state:2,
        Patient:  obj.data,
        Physician: this.data.data.Physician
      }
  
      if (this.data.data.id!=undefined){
        request._id=this.data.data.id;
      }
      request.dates=[//get date for request
          this.data.data.startDate.getMonth(),
          this.data.data.startDate.getDate(),
          this.data.data.startDate.getFullYear()
        ];
      request.dates[3]= this.appointmentForm.value.startHour+(this.appointmentForm.value.startTiming*12);
      request.dates[4]= this.appointmentForm.value.startMinute*5;
      request.dates[5]= this.appointmentForm.value.endHour+(this.appointmentForm.value.endTiming*12);
      request.dates[6]= this.appointmentForm.value.endMinute*5;
      //console.log(request);
      //create a new appointment
      this.schedulerService.createAppointment(this.onResponse.bind(this), request)
    });
  }
  saveChanges(){//save all changes
    //console.log(this.data.data);
    var request={
      _id: undefined,
      title : this.appointmentForm.value.title,
      dates: [],
      description: this.appointmentForm.value.description,
      state:this.data.data.state,
      Patient:  this.data.data.Patient,
      Physician: this.data.data.Physician
    }
    if (this.data.data.id!=undefined){
      request._id=this.data.data.id;
    }
    request.dates=[
        this.data.data.startDate.getMonth(),
        this.data.data.startDate.getDate(),
        this.data.data.startDate.getFullYear()
      ];
    request.dates[3]= this.appointmentForm.value.startHour+(this.appointmentForm.value.startTiming*12);
    request.dates[4]= this.appointmentForm.value.startMinute*5;
    request.dates[5]= this.appointmentForm.value.endHour+(this.appointmentForm.value.endTiming*12);
    request.dates[6]= this.appointmentForm.value.endMinute*5;
    //console.log(request);
    this.schedulerService.createAppointment(this.onResponse.bind(this), request)
  }
  onResponse(x){
    //console.log(x);
    this.dialog.closeAll();
  }
  deleteBook(){//delete an appointment
    this.schedulerService.deleteAppointment(this.onResponse.bind(this), this.data.data.id);
  }
  changeState(newState){//change state
    this.data.data.state=newState;
    this.saveChanges();
  }

}

let Days: String[]=['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
let Months: String[]=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
