import { Component, OnInit,  Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SchedulerService, Appointment, State } from '../../../services/scheduler.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<string>();
  @Output() emitDelete = new EventEmitter<string>();
  @Input() appointmentInfo;
  displayedColumns = ['button', 'name','date'];
  dataSource = new MatTableDataSource<Appointment>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor() { }

  ngOnChanges(x:any) {
    //console.log(this.appointmentInfo);//on any update this runs. use this to populate the table
    this.dataSource = new MatTableDataSource<Appointment>(this.appointmentInfo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  
  onConfirm(app){
    this.emitEdit.emit(app);
  }
  onDelete(app){
    this.emitDelete.emit(app);
  }

  ngOnInit() {//list all pending appointments
    this.dataSource = new MatTableDataSource<Appointment>(this.appointmentInfo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
const ELEMENT_DATA: Appointment[] = [];