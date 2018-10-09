import { Component, OnInit,  Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();
  @Output() onLoad = new EventEmitter<string>();
  @Input() formInfo: any;
  @Input() edit: any;
  currentQuesTionList;
  displayedColumns = ['button','name', 'type'];
  dataSource = new MatTableDataSource<Question>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private questionMaker: QuestionMakerService, private router: Router, public snackBar: MatSnackBar) {   }
  ngOnInit() {
    // getQuestionTypes
    this.questionMaker.getQuestions().then( (qs) => { 
      const parsedout = JSON.parse(qs._body);
      this.questionMaker.getQuestionTypes().then( (ts) => { 
        const parsedoutTs = JSON.parse(ts._body);
        this.currentQuesTionList = parsedout.questionsRecieved;  
        for (var i = 0;i<this.currentQuesTionList.length; i++){
          for (var j = 0;j<parsedoutTs.qtypes.length; j++){
            if(this.currentQuesTionList[i].type==parsedoutTs.qtypes[j]._id){
              this.currentQuesTionList[i].type=parsedoutTs.qtypes[j].name
            }
          }
        }//*/
        this.trySend();
        
        //refresh question table
        this.dataSource = new MatTableDataSource<Question>(this.currentQuesTionList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        });
    });
  }

// deletes the question
  delete(x,isActuallyDelete,z){
    if(isActuallyDelete){//if want to delete the question then remove it from the questions list and the DB
      let areYouSure = confirm("Are you sure you want to delete this question?");//confirms on delete
      if(!areYouSure){
        return;
      }
      this.questionMaker.deleteQuestion(x._id).then( (resp) => {
        const parsedOut = JSON.parse(resp._body);
        if (parsedOut.type){ // successful deletion 
          this.currentQuesTionList.splice(this.currentQuesTionList.indexOf(x),1);
          this.dataSource = new MatTableDataSource<Question>(this.currentQuesTionList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
        } else{
              // of type was false, then means unsuccessful, so alert with error and stay on same page
          const errorMsg = "there was a problem deleting the question, error recieved: \n" + parsedOut.resp; 
          alert(errorMsg);
        }
      });  
    } else {//otherwise navigate to the question form for the question id
      this.router.navigateByUrl('question-form/'+x._id);
    }
  }

  emit(x){
    this.uploaded.emit(x);
  }
  newFormArray: Question[]=[];
  // to find the desired form
  onSearchForms(form:any){//search through the questions based on the input form
    var term=form.value.SearchExercises;
    this.newFormArray=[];
    for(let x of this.currentQuesTionList){
      if(x.helpDescription.toLowerCase().includes(term.toLowerCase())){
        this.newFormArray.push(x);
      } else if(x.name.toLowerCase().includes(term.toLowerCase())){
        this.newFormArray.push(x);
      } else if(x.questionText.toLowerCase().includes(term.toLowerCase())){
        this.newFormArray.push(x);
      } else if(x.type.toLowerCase().includes(term.toLowerCase())){
        this.newFormArray.push(x);
      }
    }
    //refresh the table with the searched questions
    this.dataSource = new MatTableDataSource<Question>(this.newFormArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(...args: any[]) {
      this.trySend()
  }  
  // attempting to send current question list to other components
  trySend(){
    if(this.formInfo!=undefined && this.currentQuesTionList!= undefined){
      for (var i = 0;i<this.formInfo.questions.length; i++){
        for (var j = 0;j<this.currentQuesTionList.length; j++){
          if(this.formInfo.questions[i]==this.currentQuesTionList[j]._id){
            this.emit(this.currentQuesTionList[j]);
          }
        }
      }
    }
  }
}
const ELEMENT_DATA: Question[] = [];
