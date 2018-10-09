import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Question } from '../../../models/question';
import { QuestionType } from '../../../models/question-type';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AuthManageService } from '../../../services/auth-manage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionType: QuestionType = new QuestionType();
  question: Question = new Question(); 
  adminStatus = false;
  physStatus = false;
  possibletypes;
  qId;
  userForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     questionText:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     helpDescription:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     type:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     newTypeName:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  });  
  displayedColumns = ['name', 'questiontype', 'question', 'description', 'delete'];
  dataSource = new MatTableDataSource<Question>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private router: Router, private route: ActivatedRoute, private questionMaker: QuestionMakerService, 
private authServ: AuthManageService, public dialog: MatDialog, public snackBar: MatSnackBar) {  }


  ngOnInit() {
    // checking credentials
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      } else {
        this.qId=this.route.snapshot.params.id;
        this.userForm.controls.type.setValue(undefined);
        if(this.qId!=undefined){
          this.questionMaker.getSingleQuestionWithId(this.route.snapshot.params.id).then((retrieved) => {
            const parsedOut = JSON.parse(retrieved._body);
            this.userForm.controls.type.setValue(parsedOut.data.type);
            this.userForm.controls.name.setValue(parsedOut.data.name);
            this.userForm.controls.questionText.setValue(parsedOut.data.questionText);
            this.userForm.controls.helpDescription.setValue(parsedOut.data.helpDescription);
          });
        }
        // getting all question types
        this.questionMaker.getQuestionTypes().then((retrieved) => {
          const parsedOut2 = JSON.parse(retrieved._body);
          this.possibletypes=parsedOut2.qtypes;
        });
      }
    });
  }
  
  // adds the new question type
  onNewQuestionType(): void {
    if(this.userForm.value.newTypeName == undefined || this.userForm.value.newTypeName == ""){
      alert("that is not a valid name for a question type, select Create New Type in the Question Type dropdown to edit the name of your new type");
    }else{
      this.questionType.name=this.userForm.value.newTypeName;
      this.questionMaker.addQuestionType(this.questionType).then( (response) => {
          const parsedResp = JSON.parse(response._body);
          if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
            this.possibletypes.push(parsedResp.qtype);
            this.userForm.controls.type.setValue(parsedResp.qtype._id);
            this.userForm.controls.newTypeName.setValue("");
            this.snackBar.open('New type successfully created.'); 
          } else{
            // of type was false, then means unsuccessful, so alert with error and stay on same page
            const errorMsg = "there was a problem creating the question type, error recieved: \n" + parsedResp.resp; 
            alert(errorMsg);
          }
      });  
    }
  }
  
  // adds a new question
  onNewQuestion(): void {
    if(this.userForm.value.name == "" || this.userForm.value.questionText == ""){ 
        alert("problem creating question, name and text must be selected");
    } else {//populates a question based on form values
      this.question.name=this.userForm.value.name;
      this.question.questionText=this.userForm.value.questionText;
      this.question.helpDescription=this.userForm.value.helpDescription;
      this.question.type=this.userForm.value.type;
      this.questionMaker.addQuestion(this.question).then( (response) => {
        const parsedResp = JSON.parse(response._body);
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
         this.snackBar.open('New Question successfully created.');
          this.router.navigateByUrl('/question-selector');
        } else{
            // if type was false, then means unsuccessful, so alert with error and stay on same page
          const errorMsg = "there was a problem creating the question, error recieved: \n" + parsedResp.resp; 
          alert(errorMsg);
        }
      });   
    }
  }   
  
  // editing a question
  onEditQuestion(): void {
    if(this.userForm.value.name == "" || this.userForm.value.questionText == ""){ // i can keep adding more checks if we want them
        alert("problem creating question, name and text must be selected");
    } else {
      this.question.name=this.userForm.value.name;
      this.question.questionText=this.userForm.value.questionText;
      this.question.helpDescription=this.userForm.value.helpDescription;
      this.question.type=this.userForm.value.type;
      this.questionMaker.editQuestion(this.qId, this.question).then( (response) => {
        const parsedResp = JSON.parse(response._body);
        if(parsedResp.type){ // reached if type is true, successful, so notify and redirect
          alert('question successfully editted');
          this.router.navigateByUrl('/question-selector');
        } else{
            // if type was false, then means unsuccessful, so alert with error and stay on same page
          const errorMsg = "there was a problem creating the question, error recieved: \n" + parsedResp.resp; 
          alert(errorMsg);
        }
      });   
    }
  }   
} 
const ELEMENT_DATA: Question[] = [];