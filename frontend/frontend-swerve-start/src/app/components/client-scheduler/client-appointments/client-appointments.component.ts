import { Component, OnInit,  Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Appointment, SchedulerService} from '../../../services/scheduler.service';
import { ActivatedRoute } from '@angular/router';
import {  PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.css']
})
export class ClientAppointmentsComponent implements OnInit {
  @Input() appointmentInfo;
  displayedColumns = ['name','date'];
  dataSource = new MatTableDataSource<Appointment>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private schedulerService: SchedulerService,
              private route: ActivatedRoute,
              private physService: PhysicianManageProfileService) {
      var email = this.route.snapshot.params.email;
      console.log(email)
      this.physService.getToken(email).then((respond) => {
        const obj = JSON.parse(respond._body)
        console.log(obj);
        this.schedulerService.getMyAppointments(this.refresh.bind(this), obj.data);
      });
    }

  refresh(app) {
    this.appointmentInfo=app;
    console.log(this.appointmentInfo);//on any update this runs. use this to populate the table
    this.dataSource = new MatTableDataSource<Appointment>(this.appointmentInfo);
    this.dataSource.sort = this.sort;
  }  
    ngOnInit() {
  }

}
const ELEMENT_DATA: Appointment[] = [];