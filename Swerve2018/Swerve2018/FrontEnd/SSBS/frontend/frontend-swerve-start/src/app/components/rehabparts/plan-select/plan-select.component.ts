import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../../services/assessment-form-manager.service';
import { ManageExerciseService } from'../../../services/manage-exercise.service';
import { RehabPlanManagerService } from'../../../services/rehab-plan-manager.service';
import { Question } from '../../../models/question';
import { AssessForm } from '../../../models/form';
import { RehabPlan } from '../../../models/rehab-plan';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-plan-select',
  templateUrl: './plan-select.component.html',
  styleUrls: ['./plan-select.component.css']
})
export class PlanSelectComponent implements OnInit {

  completedForms; //completeforms has all of the completed forms
  constructor(private rehabManage: RehabPlanManagerService, private router: Router) { }

  ngOnInit() {
    this.rehabManage.getPlans().then( (response) => { 
      const parsedResp = JSON.parse(response._body);
      if(parsedResp.type){// successful get 
        this.completedForms = parsedResp.plansRecieved;
        this.dataSource = new MatTableDataSource<RehabPlan>(this.completedForms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        //console.log(this.completedForms);
      } else{ // log error                
        alert(parsedResp.response);
      }  
    });
  }
  
  displayedColumns = ['button','name'];
  dataSource = new MatTableDataSource<RehabPlan>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  newFormRedirect(): void {//redirect to new form
    this.router.navigateByUrl('/rehab-plan');
  }
  
  editPlan(formWanted): void {//edit form by id
    const editRedirect = "/edit-plan/" +formWanted._id; 
    this.router.navigateByUrl(editRedirect);
  }
  onSearch(form:any){//search based on term
    this.search(form.value.Search);
    }
  
    newArray: RehabPlan[]=[];
  search(term){
    this.newArray=[];

    for(let i=0; i<this.completedForms.length;i++){
      if(this.completedForms[i].name.toLowerCase().includes(term.toLowerCase())){
              this.newArray.push(this.completedForms[i]);
            }
    }
    //console.log(this.newArray);
    this.dataSource = new MatTableDataSource<RehabPlan>(this.newArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  


  
   deletePlan(questionToDel): void {//delete plan by id
    //console.log("trying to delete rehab plan");
    let qID = questionToDel._id;
    //console.log(questionToDel);
    //console.log('with id: ');
    //console.log(qID);
    var r = confirm('Are you sure you want to delete this rehab plan?');
    if(r){
    this.rehabManage.deletePlan(qID).then( (resp) => {
      const parsedOut = JSON.parse(resp._body);
      this.rehabManage.getPlans().then( (response) => { 
      const parsedResp = JSON.parse(response._body);
      if(parsedResp.type){// successful get 
        
        this.completedForms = parsedResp.plansRecieved;
        this.dataSource = new MatTableDataSource<RehabPlan>(this.completedForms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        //console.log(this.completedForms);
      } else{ // log error
        alert(parsedResp.response);
      }  
    });
  }); 
    }
  } 

}
const ELEMENT_DATA: RehabPlan[] = [];