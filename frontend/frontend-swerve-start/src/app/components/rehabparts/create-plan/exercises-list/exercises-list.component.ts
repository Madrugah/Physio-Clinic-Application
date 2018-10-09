import { Component, OnInit,  Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../../services/auth-manage.service';
import { ManageExerciseService } from'../../../../services/manage-exercise.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>()
  @Output() onLoad = new EventEmitter<string>();
  @Input() menuInfo: any;
  currentExerciseList;
  dataSource2 = new MatTableDataSource<Exercise>(ELEMENT_DATA2);
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;
  loaded=false;

  constructor(private router: Router,
    private exerciseFetch: ManageExerciseService, private authServ: AuthManageService) { }
  
  displayedColumns = ['button','name'];
  ngOnInit() {  
    console.log("getting exercises");
    this.exerciseFetch.getExercisesNoPic( (org) =>{
      this.loaded=true;
      this.currentExerciseList = org.exercises;
      this.trySend()
      console.log(this.currentExerciseList);
      this.onLoad.emit(this.currentExerciseList);
      this.dataSource2 = new MatTableDataSource<Exercise>(this.currentExerciseList);
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort2;
        
    });
  }
  newArray: Exercise[]=[];
  onSearch(form:any){
    //(form.value.SearchExercises);
    var term=form.value.SearchExercises;
    this.newArray=[];
    console.log(term);
    for(let x of this.currentExerciseList){
      console.log(x.name);
      if(x.name.toLowerCase().includes(term.toLowerCase())){
        this.newArray.push(x);
      }
    }
      this.dataSource2 = new MatTableDataSource<Exercise>(this.newArray);
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort2;
  }
  selectThisExercise(x) {
    this.uploaded.emit(x);
  }
    ngOnChanges(...args: any[]) {
      this.trySend()
  }  
  trySend(){
    if(this.menuInfo!=undefined && this.currentExerciseList!= undefined){
      for (var i = 0;i<this.menuInfo.exercises.length; i++){
        for (var j = 0;j<this.currentExerciseList.length; j++){
          if(this.menuInfo.exercises[i]==this.currentExerciseList[j]._id){
            this.selectThisExercise(this.currentExerciseList[j]);
          }
        }
      }
    }
  }
}
//<child-comp (uploaded)="someMethod($event)"></child-comp>
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
    multimediaURL?: String;
}
const ELEMENT_DATA2: Exercise[] = [];