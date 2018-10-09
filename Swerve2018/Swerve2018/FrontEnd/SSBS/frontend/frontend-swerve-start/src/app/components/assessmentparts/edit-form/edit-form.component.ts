import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../../services/assessment-form-manager.service';
import { Question } from '../../../models/question';
import { AssessForm } from '../../../models/form';
import { Router } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  adminStatus = false;
  physStatus = false;
  assessmentform: AssessForm = new AssessForm();
  selectedQuestions; 
  myForm;
  editId;
  userForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     description:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  });  
  constructor(private questionMaker: QuestionMakerService, 
              private assesmentMaker: AssessmentFormManagerService, 
              private router: Router,
              private route: ActivatedRoute,
              private authServ: AuthManageService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    // checking credentials
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      if( !validateRaw.data && !validateRaw.data3){ // means they r not admin
        this.router.navigateByUrl('');
      }
      else {
          // getting the information of the selected test
        this.editId =  this.route.snapshot.params.id;
        this.assesmentMaker.getSingleFormWithId(this.editId).then( (response) => {
          const parsedResp = JSON.parse(response._body);
          if(parsedResp.type){// if successfully retrieved
            this.myForm=parsedResp.data;
            this.userForm.controls.name.setValue(parsedResp.data.name);
            this.userForm.controls.description.setValue(parsedResp.data.description);
            this.myForm=parsedResp.data;
          } else{ // log error
            const badError = "error fetching form from database, error: " + parsedResp.data;
            alert(badError);
          } 
        }); 
        this.selectedQuestions =[]; 
        this.assessmentform.questions =[]; 
      }
    });
  }
  // these are same as in assessment-form
 selectQuestion(x): void {  
    this.selectedQuestions.push(x);
  }

  removeQuestion(index): void { 
    this.selectedQuestions.splice(index, 1);
  }
  
  // this updates the test
  onNewAssesmentTest(): void { 
    for (let x of this.selectedQuestions){ 
        this.assessmentform.questions.push(x._id); 
    } 
    this.assessmentform.name=this.userForm.value.name;
    this.assessmentform.description=this.userForm.value.description;
    if(this.assessmentform.name == undefined){
      alert('error: no name defined for this form');
    } else {
      //       this.assesmentMaker.editForm(this.assessmentform).then( (response) => {
      this.assesmentMaker.addForm(this.assessmentform).then( (response) => {
        const parsedResp = JSON.parse(response._body);
        
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          this.snackBar.open('Form successfully created', 'Ok',  {
            duration: 3000
          });
          this.router.navigateByUrl('assessment-select');
          //redirect
        } else{
          // of type was false, then means unsuccessful, so alert with error and stay on same page
          const errorMsg = "there was a problem creating the form, error recieved: \n" + parsedResp.resp; 
          alert(errorMsg);
        }
      }); 
    } 
  }
  
  onUpdateAssesmentTest(): void { 
    for (let x of this.selectedQuestions){ 
        this.assessmentform.questions.push(x._id); 
    } 
    this.assessmentform._id = this.myForm._id
    this.assessmentform.name=this.userForm.value.name;
    this.assessmentform.description=this.userForm.value.description;
    if(this.assessmentform.name == undefined){
      alert('error: no name defined for this form');
    } else {
      this.assesmentMaker.editForm(this.assessmentform).then( (response) => {
        const parsedResp = JSON.parse(response._body);
        
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          this.snackBar.open('Form successfully updated', 'Ok',  {
            duration: 3000
          });
          this.router.navigateByUrl('assessment-select');
          //redirect
        } else{
          // of type was false, then means unsuccessful, so alert with error and stay on same page
          const errorMsg = "there was a problem creating the form, error recieved: \n" + parsedResp.resp; 
          alert(errorMsg);
        }
      }); 
    } 
  }
  
 redirectSelect(): void {
    this.router.navigateByUrl('/assessment-select');
  }  
}

