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
  @Input() showAppointments;
  displayedColumns = ['name','physician','date'];
  dataSource = new MatTableDataSource<Appointment>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private schedulerService: SchedulerService,
              private route: ActivatedRoute,
              private physService: PhysicianManageProfileService) {
                //get the email of the patient
      var email = this.route.snapshot.params.email; 
      //get the token of the email and then get appointments corresponding to it
      this.physService.getToken(email).then((respond) => {
        const obj = JSON.parse(respond._body) 
        this.schedulerService.getMyAppointments(this.refresh.bind(this), obj.data);
      });
    }

  refresh(app) {
    this.appointmentInfo=app; //on any update this runs. use this to populate the table
    this.dataSource = new MatTableDataSource<Appointment>(this.appointmentInfo);
    this.dataSource.sort = this.sort;
  }  
    ngOnInit() {
  }

}
const ELEMENT_DATA: Appointment[] = [];