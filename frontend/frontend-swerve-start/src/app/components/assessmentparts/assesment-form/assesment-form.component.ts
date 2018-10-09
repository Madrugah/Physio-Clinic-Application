import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../../services/assessment-form-manager.service';
import {Question} from '../../../models/question';
import {AssessForm } from '../../../models/form';
import { Router } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-assesment-form',
  templateUrl: './assesment-form.component.html',
  styleUrls: ['./assesment-form.component.css']
})
export class AssesmentFormComponent implements OnInit {
  adminStatus = false;
  physStatus = false;
  assessmentform: AssessForm = new AssessForm();
  selectedQuestions; 
  userForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     description:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  });  
  constructor(private questionMaker: QuestionMakerService, private assesmentMaker: AssessmentFormManagerService, 
  private router: Router, private authServ: AuthManageService) { }

  ngOnInit() { 
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      }
      else {
        this.selectedQuestions =[]; 
        this.assessmentform.questions =[]; 
      }
    });
  }
  
 selectQuestion(x): void {  
    this.selectedQuestions.push(x);
  }

  removeQuestion(index): void { 
    this.selectedQuestions.splice(index, 1);
  }
  
  onNewAssesmentTest(): void { 
    for (let x of this.selectedQuestions){ 
        this.assessmentform.questions.push(x._id); 
    } 
    this.assessmentform.name=this.userForm.value.name;
    this.assessmentform.description=this.userForm.value.description;
    if(this.assessmentform.name == undefined){
      alert('error: no name defined for this form');
    } else {
      this.assesmentMaker.addForm(this.assessmentform).then( (response) => {
        const parsedResp = JSON.parse(response._body);
        
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          alert('form successfully created');
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
