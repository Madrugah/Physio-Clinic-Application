import { SchedulerService, Appointment, State, Physician } from '../../services/scheduler.service';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { OnInit, NgModule, Inject, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { SchedulerDialogComponent } from '../test-scheduler/scheduler-dialog/scheduler-dialog.component';
import Query from 'devextreme/data/query';
import { ActivatedRoute } from '@angular/router';



if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}
@Component({
  selector: 'app-physician-account-list',
  templateUrl: './physician-account-list.component.html',
  styleUrls: ['./physician-account-list.component.css']
})
export class PhysicianAccountListComponent implements OnInit {
    Physicians: Physician[];
    index;
    shown;
    Appointments: Appointment[];
    States: State[];
    currentDate: Date = new Date();
    constructor(private service: SchedulerService, public dialog: MatDialog,
                private route: ActivatedRoute, private physService: PhysicianManageProfileService) {
      this.physicianRefresh()
    }
    physicianRefresh(){
        this.service.getPhysicians(this.onPhysicianRefreshResponse.bind(this));
    }
    onPhysicianRefreshResponse(x){
      //console.log(x)
      this.Physicians=x;
      this.dataSource = new MatTableDataSource<Physician>(this.Physicians);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    deletePhys(x){
      this.physService.deleteAcc(this.Physicians[x].email).then( (removeResp) => { 
          const parsedOut = JSON.parse(removeResp._body); 
          alert(parsedOut.data)
          if(parsedOut.type)
          {
            this.Physicians.splice(x,1);
            this.dataSource = new MatTableDataSource<Physician>(this.Physicians);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }  
      }); 
      // delete this.Physicians[x].email 
    }
    ngOnInit() {}
  displayedColumns = ['button', 'first', 'last','email'];
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