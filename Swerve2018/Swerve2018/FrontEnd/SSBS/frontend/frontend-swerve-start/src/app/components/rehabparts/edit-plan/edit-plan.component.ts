import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../../services/assessment-form-manager.service';
import { ManageExerciseService } from'../../../services/manage-exercise.service';
import { AuthManageService } from '../../../services/auth-manage.service';
import { RehabPlanManagerService } from'../../../services/rehab-plan-manager.service';
import { Question } from '../../../models/question';
import { AssessForm } from '../../../models/form';
import { RehabPlan } from '../../../models/rehab-plan';
import { Router } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  rehabPlan: RehabPlan = new RehabPlan();
  currentExercise; 
  selectedExercises;
  currentTest;
  selectedTests; 
  currentExerciseList;
  currentTestList; 
  editId; 
  myMenu;
  data: any[] = [{},{},{}];
  testList: AssessForm[] = [];
  userForm = new FormGroup({
       name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       timeFrameToComplete: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       goal:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       description:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  });  
  
  constructor(private router: Router, 
              private questionMaker: QuestionMakerService, 
              private assesmentMaker: AssessmentFormManagerService,
              private exerciseFetch: ManageExerciseService, 
              private rehabManage: RehabPlanManagerService,
              private route: ActivatedRoute,
              private authServ: AuthManageService ) {
    }

  ngOnInit() {  //validate user
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      //console.log('recieved from auth:');
      //console.log(validateRaw);
      if( !validateRaw.data && !validateRaw.data3){ // means they r not admin
        this.router.navigateByUrl('');
      } else {
        this.editId =  this.route.snapshot.params.id; 
        //get a single plan that needs to be updated
        this.rehabManage.getSinglePlanWithId(this.editId).then( (response) => {
          const parsedResp = JSON.parse(response._body);
          if(parsedResp.type){// if successfully retrieved
            //console.log(parsedResp.data); 
            this.myMenu=parsedResp.data;
            this.userForm.controls.name.setValue(parsedResp.data.name);
            this.userForm.controls.description.setValue(parsedResp.data.description);
            this.userForm.controls.goal.setValue(parsedResp.data.goal);
            this.userForm.controls.timeFrameToComplete.setValue(parsedResp.data.timeFrameToComplete);
            this.myMenu=parsedResp.data;
          } else{ // log error
            const badError = "error fetching form from database, error: " + parsedResp.data;
            alert(badError);
          } 
        }); 
        this.selectedExercises =[]; 
        this.rehabPlan.exercises =[];
        this.rehabPlan.tests =[];
        this.selectedTests =[];  
      }
    });
    
  }
  selectThisExercise(x): void { 
    this.selectedExercises.push(x);
  }
  
  selectThisAssessment(x): void { 
    // //console.log(x);
    this.selectedTests.push(x);
  }

  removeTest (qToRemove): void { 
    //console.log(qToRemove);
    if (qToRemove > -1) {
      this.selectedTests.splice(qToRemove, 1);
    }
  }
  

  removeExercise (qToRemove): void { 
    if (qToRemove > -1) {
      this.selectedExercises.splice(qToRemove, 1);
    }
  }


   onUpdateRehabPlan(): void { //change the values of the rehab plan and restore in the database
    //console.log(this.userForm.value);
    this.rehabPlan.name = this.userForm.value.name;
    this.rehabPlan.description = this.userForm.value.description;
    this.rehabPlan.goal = this.userForm.value.goal;
    this.rehabPlan.timeFrameToComplete = this.userForm.value.timeFrameToComplete;
    // //console.log("trying to submit");
    for (let x of this.selectedExercises){ 
        this.rehabPlan.exercises.push(x._id); 
    } 
    for (let x of this.selectedTests){ 
        this.rehabPlan.tests.push(x._id); 
    }
    if(this.rehabPlan.name == undefined){
      alert('error: no name defined for this form');
    } else {
      //console.log('rehabPlan: ')
      //console.log(this.rehabPlan);
      this.rehabManage.editPlan2(this.rehabPlan, this.editId).then( (response) => {
        //console.log(response); 
        const parsedResp = JSON.parse(response._body);
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          alert('plan successfully updated');
          this.router.navigateByUrl('rehab-plan-select');
        } else{
          const errorMsg = "there was a problem creating the plan, error recieved: \n" + parsedResp.resp; 
          alert(errorMsg);
        }
      }); 

    } 
  }

   onNewRehabPlan(): void { 
    //console.log(this.userForm.value);
    this.rehabPlan.name = this.userForm.value.name;
    this.rehabPlan.description = this.userForm.value.description;
    this.rehabPlan.goal = this.userForm.value.goal;
    this.rehabPlan.timeFrameToComplete = this.userForm.value.timeFrameToComplete;
    // //console.log("trying to submit");
    for (let x of this.selectedExercises){ 
        this.rehabPlan.exercises.push(x._id); 
    } 
    for (let x of this.selectedTests){ 
        this.rehabPlan.tests.push(x._id); 
    }
    if(this.rehabPlan.name == undefined){
      alert('error: no name defined for this form');
    } else {
      //console.log('rehabPlan: ')
      //console.log(this.rehabPlan);
      this.rehabManage.addPlan(this.rehabPlan).then( (response) => {
        //console.log(response); 
        const parsedResp = JSON.parse(response._body);
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          alert('form successfully created');
          this.router.navigateByUrl('rehab-plan-select');
        } else{
          // of type was false, then means unsuccessful, so alert with error and stay on same page
          const errorMsg = "there was a problem creating the form, error recieved: \n" + parsedResp.resp; 
          alert(errorMsg);
        }
      }); 
    } 
  }
  
  redirectSelect(): void {
    this.router.navigateByUrl('/rehab-plan-select');
  }
}
export interface Exercise {
    _id:String;
    duration: Number;
    name: String;
    description: String;
    objectives: String;
    authorName: String;
    actionSteps: String;
    location: String;
    frequency: Number;
    targetDate: Date;
    multimediaURL: String;
}
const ELEMENT_DATA: AssessForm[] = [];
const ELEMENT_DATA2: Exercise[] = [];

