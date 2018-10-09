import { Component, OnInit,  Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../../services/auth-manage.service';
import { AssessmentFormManagerService } from'../../../../services/assessment-form-manager.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { AssessForm } from '../../../../models/form';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();
  @Output() onLoad = new EventEmitter<string>();
  @Input() menuInfo: any;
  @Input() edit: any;
  // [edit]="isForEdit"
  currentTestList;
  displayedColumns = ['button','name'];
  dataSource = new MatTableDataSource<AssessForm>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private assesmentMaker: AssessmentFormManagerService) {   }
  ngOnInit() {
    //console.log(this.menuInfo);
    //gets the test list and populates table
    this.assesmentMaker.getForms().then( (response) =>{ 
      const parsedResp = JSON.parse(response._body);
      this.currentTestList = parsedResp.formsRecieved;
      this.trySend();
      //console.log(this.currentTestList);
      this.onLoad.emit(this.currentTestList);
      this.dataSource = new MatTableDataSource<AssessForm>(this.currentTestList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  emit(x){//emits update
    this.uploaded.emit(x);
  }
  emitDelete(x, y){//emits the delete
    x.description=y;
    this.uploaded.emit(x);
  }

  newFormArray: AssessForm[]=[];
  onSearchForms(form:any){//search based on a term and refresh table
    //console.log(form);
    var term=form.value.SearchExercises;
    this.newFormArray=[];
    //console.log(term);
    for(let x of this.currentTestList){
      //console.log(x.name);
      if(x.name.toLowerCase().includes(term.toLowerCase())){
        this.newFormArray.push(x);
      }
    }
    this.dataSource = new MatTableDataSource<AssessForm>(this.newFormArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(...args: any[]) {//listen for changes
      //console.log(this.menuInfo);
      this.trySend()
  }  
  trySend(){//try to send the current testlist to parent
    if(this.menuInfo!=undefined && this.currentTestList!= undefined){
      for (var i = 0;i<this.menuInfo.tests.length; i++){
        for (var j = 0;j<this.currentTestList.length; j++){
          if(this.menuInfo.tests[i]==this.currentTestList[j]._id){
            this.emit(this.currentTestList[j]);
          }
        }
      }
    }
  }
}
const ELEMENT_DATA: AssessForm[] = [];
