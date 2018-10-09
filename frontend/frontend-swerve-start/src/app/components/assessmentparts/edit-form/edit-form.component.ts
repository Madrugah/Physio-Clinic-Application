import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../../services/assessment-form-manager.service';
import { Question } from '../../../models/question';
import { AssessForm } from '../../../models/form';
import { Router } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';

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
              private authServ: AuthManageService) { }

  ngOnInit() { 
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      }
      else {
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
      //       this.assesmentMaker.editForm(this.assessmentform).then( (response) => {
      this.assesmentMaker.addForm(this.assessmentform).then( (response) => {
        const parsedResp = JSON.parse(response._body);
        
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          alert('Form successfully created');
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







// assessmentform: AssessForm = new AssessForm();
//   adminStatus = false;
//   physStatus = false;
//   availableQuestions;
//   selectedQuestions; 
//   questionsToFetch;
//   chosenQ;
  
//   editId;
//   constructor(private questionMaker: QuestionMakerService, private assesmentMaker: AssessmentFormManagerService,
//     private route: ActivatedRoute, private router: Router, private authServ: AuthManageService) { }

//   ngOnInit() {  
//     this.authServ.validate().then( (resp) => {
//       const validateRaw = JSON.parse(resp._body);
//       this.adminStatus = validateRaw.data;
//       this.physStatus = validateRaw.data3;
//       if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
//         this.router.navigateByUrl('');
//       } else {
      
//         this.editId =  this.route.snapshot.params.id;
//         if(this.editId == undefined){ // means couldnt find id, so take em back
//           alert("error finding form to edit"); 
//         } else {
//           this.questionMaker.getQuestions().then( (qs) => { 
//             const parsedout = JSON.parse(qs._body);
//             this.availableQuestions = parsedout.questionsRecieved;  
//           });
//           this.assesmentMaker.getSingleFormWithId(this.editId).then( (response) => {
//             const parsedResp = JSON.parse(response._body);
//             if(parsedResp.type){// if successfully retrieved
//               this.selectedQuestions = []; // init blank array to put questions fetched into
//               this.questionsToFetch = parsedResp.data.questions;
//               this.assessmentform.name = parsedResp.data.name;
//               this.assessmentform.description = parsedResp.data.description;
//               for( let questionId of this.questionsToFetch ){
//                 this.questionMaker.getSingleQuestionWithId(questionId).then( (qBack) => {
//                   let parsedqBack = JSON.parse(qBack._body); 
//                   this.selectedQuestions.push(parsedqBack.data);
//                 });
//               }
//             } else{ // log error
//               const badError = "error fetching form from database, error: " + parsedResp.data;
//               alert(badError);
//             } 
//           }); 
//         }  
//       }
//     });
//   }
  
// selectQuestion(): void { 
//     for (let x of this.availableQuestions){
//       if(x.name == this.chosenQ){ 
//         this.selectedQuestions.push(x);
//       }
//     }
//   }

// removeQuestion(qToRemove): void { 
//   var index = this.selectedQuestions.indexOf(qToRemove, 0);
//   if (index > -1) {
//     this.selectedQuestions.splice(index, 1);
//   }
// }
  
//   onEditAssesmentTest(): void { 
//     this.assessmentform.questions =[];
//     for (let x of this.selectedQuestions){ 
//         this.assessmentform.questions.push(x._id); 
//     } 
//     if(this.assessmentform.name == undefined){
//       alert('error: no name defined for this form');
//     } else {
//       this.assesmentMaker.editForm(this.assessmentform).then( (response) => {
//         const parsedResp = JSON.parse(response._body);
//         if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
//           alert('form successfully updated');
//           this.router.navigateByUrl('assessment-select');
//           //redirect
//         } else{
//           // of type was false, then means unsuccessful, so alert with error and stay on same page
//           const errorMsg = "there was a problem creating the form, error recieved: \n" + parsedResp.resp; 
//           alert(errorMsg);
//         }
//       }); 
//     } 
//   }
  
//   redirectSelect(): void {
//     this.router.navigateByUrl('/assessment-select');
//   }
// }
