import { SchedulerService, Appointment, State } from '../../services/scheduler.service';
import { OnInit, NgModule, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DxSchedulerModule, DxSchedulerComponent, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { SchedulerDialogComponent } from './scheduler-dialog/scheduler-dialog.component';
import { ExerciseDialogComponent } from '../exercise/exercise-dialog/exercise-dialog.component';

import Query from 'devextreme/data/query';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}
@Component({
  selector: 'app-test-scheduler',
  templateUrl: './test-scheduler.component.html',
  styleUrls: ['./test-scheduler.component.css',
              "../../../../node_modules/devextreme/dist/css/dx.common.css", 
              "../../../../node_modules/devextreme/dist/css/dx.light.css"]
})
export class TestSchedulerComponent implements OnInit {
     @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;
    
    ConfirmedAppointments: Appointment[]=[];
    PendingAppointments: Appointment[]=[];
    Appointments: Appointment[];
    States: State[];
    currentDate: Date = new Date();
    constructor(private service: SchedulerService, public dialog: MatDialog) {
        this.refresh()
    }
    preRefresh(x){
        this.refresh();
    }
    refresh(){//get appointments and states on refresh
        this.States = this.service.getStates();
        this.service.getAppointments(this.onRefreshResponse.bind(this), localStorage.getItem('token'));
    }
    onRefreshResponse(x){//respond to refreshing
        this.scheduler.instance.beginUpdate();
        this.Appointments = x;
        //console.log(this.Appointments);
        this.scheduler.instance.repaint();
        this.scheduler.instance.endUpdate();
        this.ConfirmedAppointments=[];
        this.PendingAppointments=[];
        for(var i = 0; i<this.Appointments.length;i++){
            var App:Appointment=this.Appointments[i];
            if(App.startDate>new Date()){
                //console.log(App)
                if(App.state==1){ 
                    this.ConfirmedAppointments.push(App);
                } else if(App.state==2){ 
                    this.PendingAppointments.push(App);
                }
            }
        }
        //console.log(this.ConfirmedAppointments)
        //console.log(this.PendingAppointments)
    }
    ngOnInit() {
    }
    changeState(id){
        //console.log(id);
        id.state=1;
        this.onUpdate(id);
    }
    onForm(x:any){
        //open popup on dialog open
        // if(this.first){
            //console.log(x.appointmentData);
            //this.service.setVals(x.appointmentData)
            let dialogRef = this.dialog.open(SchedulerDialogComponent, {
              width: '700px',
              data:{
                  data:x.appointmentData
              }
            });
            dialogRef.afterClosed().subscribe(selection => {
                this.refresh();
            });
            this.scheduler.instance.showAppointmentPopup(holderApps[0], false);
            this.scheduler.instance.hideAppointmentPopup(false);
        // }
      }
    onPreUpdate(x:any){
        this.onUpdate(x.newData);
    }
    deleteApp(id){//delete appointment
        //console.log(id);
        this.service.deleteAppointment(this.preRefresh.bind(this), id.id);
    }
    onUpdate(x:any){//update data
        //console.log(x);
        // var y=x.newData;
        var y={
          _id: x.id,
          title : x.title,
          dates: [],
          description: x.description,
          state: x.state,
          Patient: x.Patient,
          Physician: x.Physician
        }
        y.dates=[
            x.startDate.getMonth(),
            x.startDate.getDate(),
            x.startDate.getFullYear(),
            x.startDate.getHours(),
            x.startDate.getMinutes(),
            x.endDate.getHours(),
            x.endDate.getMinutes()
        ];
        this.service.createAppointment(this.onUpdateResponse.bind(this), y);
    //create an appointment
    }
    onUpdateResponse(x){
        //console.log(x);
        this.refresh();
    }
}
    
let holderApps: Appointment[] = [{
        title: 'noah',
        description: 'hello',
        state: 0,
        Patient: '0',
        Physician: '0',
        startDate: new Date(2018, 4, 24, 9, 10),
        endDate: new Date(2018, 4, 24, 11, 1),
        givenName: 'noah',
        familyName: 'noah',
        physFirstName: 'noah',
        physLastName: 'noah'
    }, {
        title: 'noah',
        description: 'hello',
        state: 1,
        Patient: '0',
        Physician: '0',
        startDate: new Date(2018, 4, 24, 14, 10),
        endDate: new Date(2018, 4, 24, 16, 1),
        physFirstName: 'noah',
        physLastName: 'noah'
    }
];