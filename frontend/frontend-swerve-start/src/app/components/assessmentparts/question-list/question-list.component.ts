import { Component, OnInit,  Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
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
  
  // this.questionMaker.getQuestions().then( (qs) => { 
  //   const parsedout = JSON.parse(qs._body);
  //   this.availableQuestions = parsedout.questionsRecieved;  
  // });

  constructor(private questionMaker: QuestionMakerService, private router: Router) {   }
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
        this.dataSource = new MatTableDataSource<Question>(this.currentQuesTionList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        });
    });
  }

  delete(x,y,z){
    if(y){
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
    } else {
      this.router.navigateByUrl('question-form/'+x._id);
    }
  }

  emit(x){
    this.uploaded.emit(x);
  }
  newFormArray: Question[]=[];
  onSearchForms(form:any){
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
    this.dataSource = new MatTableDataSource<Question>(this.newFormArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(...args: any[]) {
      this.trySend()
  }  
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
