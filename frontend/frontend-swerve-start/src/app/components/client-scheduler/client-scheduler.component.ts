import { SchedulerService, Appointment, State, Physician } from '../../services/scheduler.service';
import { OnInit, NgModule, Inject, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { DxSchedulerModule, DxSchedulerComponent, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { SchedulerDialogComponent } from '../test-scheduler/scheduler-dialog/scheduler-dialog.component';
import Query from 'devextreme/data/query';



if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}
@Component({
  selector: 'app-client-scheduler',
  templateUrl: './client-scheduler.component.html',
  styleUrls: ['./client-scheduler.component.css',
              "../../../../node_modules/devextreme/dist/css/dx.common.css", 
              "../../../../node_modules/devextreme/dist/css/dx.light.css"]
})
export class ClientSchedulerComponent implements OnInit {
     @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;
    Physicians: Physician[];
    index;
    shown;
    Appointments: Appointment[];
    States: State[];
    currentDate: Date = new Date();
    constructor(private service: SchedulerService, public dialog: MatDialog) {
      this.physicianRefresh()
      this.States = this.service.getStates();
    }
    physicianRefresh(){
        this.service.getPhysicians(this.onPhysicianRefreshResponse.bind(this));
    }
    onPhysicianRefreshResponse(x){
      this.Physicians=x;
      this.dataSource = new MatTableDataSource<Physician>(this.Physicians);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    onPhysChoice(index){
      this.index=index;
      this.appointmentRefresh();
    }
    
    appointmentRefresh(){
        this.service.getAppointments(this.onAppointmentRefreshResponse.bind(this), this.Physicians[this.index].token);
    }
    onAppointmentRefreshResponse(x){
        this.Appointments = x;
        this.shown=true;
        this.scheduler.instance.beginUpdate();
        this.Appointments = x;
        this.scheduler.instance.repaint();
        this.scheduler.instance.endUpdate();
    }
    ngOnInit() {}
    onForm(x:any){
        // if(this.first){
            var t = this.Physicians[this.index].token;
            //this.service.setVals(x.appointmentData)
            let dialogRef = this.dialog.open(SchedulerDialogComponent, {
              width: '700px',
              data:{
                data:x.appointmentData,
                client:true,
                Physician:t
              }
            });
            dialogRef.afterClosed().subscribe(selection => {
                this.appointmentRefresh();
            });
            this.scheduler.instance.showAppointmentPopup(holderApps[0], false);
            this.scheduler.instance.hideAppointmentPopup(false);
        // }
      }
  displayedColumns = ['button', 'first', 'last'];
  dataSource = new MatTableDataSource<Physician>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
}
    
const ELEMENT_DATA: Physician[] = [];


let holderApps: Appointment[] = [{
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