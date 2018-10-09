import { Component, OnInit,  Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../../services/auth-manage.service';
import { QuestionMakerService } from '../../../../services/question-maker.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { QuestionType } from '../../../../models/question-type';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  currentQuestionTypeList;
  displayedColumns = ['button','name'];
  dataSource = new MatTableDataSource<QuestionType>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private questionMaker: QuestionMakerService, private router: Router) {   }
  ngOnInit() {
    //get all of the question types and display in a table
    this.questionMaker.getQuestionTypes().then( (ts) => { 
      const parsedoutTs = JSON.parse(ts._body);
      this.currentQuestionTypeList = parsedoutTs.qtypes;  
      this.dataSource = new MatTableDataSource<QuestionType>(this.currentQuestionTypeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(x){//delete a question by getting the question then referring to its id
    this.questionMaker.deleteQuestionType(x._id).then( (resp) => {
      const parsedOut = JSON.parse(resp._body);
      if (parsedOut.type){ // successful deletion 
        this.currentQuestionTypeList.splice(this.currentQuestionTypeList.indexOf(x),1);
        this.dataSource = new MatTableDataSource<QuestionType>(this.currentQuestionTypeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else{
            // of type was false, then means unsuccessful, so alert with error and stay on same page
        const errorMsg = "There was a problem deleting the question, error recieved: \n" + parsedOut.resp; 
        alert(errorMsg);
      }
    });  
  }
  newFormArray: QuestionType[]=[];
  onSearchForms(form:any){//filter the question type list based on a search term
    var term=form.value.SearchExercises;
    this.newFormArray=[];
    for(let x of this.currentQuestionTypeList){
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
    //refilter the question type list based on the searched term
    this.dataSource = new MatTableDataSource<QuestionType>(this.newFormArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
const ELEMENT_DATA: QuestionType[] = [];

