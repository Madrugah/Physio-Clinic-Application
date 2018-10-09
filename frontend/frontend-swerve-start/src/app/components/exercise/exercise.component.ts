import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { ManageExerciseService } from '../../services/manage-exercise.service';
import { ExerciseDialogComponent } from './exercise-dialog/exercise-dialog.component';
import { MenuMakerComponent } from './menu-maker/menu-maker.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthManageService } from '../../services/auth-manage.service';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  adminStatus = false;
  physStatus = false;
  isAllowed = false;
  exercises;
  show=false;
  del;
  token;
  constructor(private exerciseService:ManageExerciseService, public dialog: MatDialog,
    private router: Router, private authServ: AuthManageService) {   }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      console.log('recieved from auth:');
      console.log(validateRaw);
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      } else {
        this.isAllowed = true;
        this.refresh(); 
      }
    }); 
  }
  refresh(){
    this.exerciseService.getExercises(this.onInitResponse.bind(this));  // get all existing exercises  
  }
  onInitResponse(x:any){
    //console.log(x.exercises);
    this.exercises=x.exercises;
    console.log(this.exercises);
    this.dataSource = new MatTableDataSource<Exercise>(this.exercises)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onDelete(index){
    //console.log(this.exercises[index]._id);
    // confirm first before delete
    var r = confirm('Are you sure you want to delete this exercise?');
    if (r) {
      this.exerciseService.deleteExercise(this.onDeleteResponse.bind(this), this.exercises[this.paginator.pageIndex * this.paginator.pageSize + index ]._id);  // get all existing exercises  
    }
    return r;
  }
  onDeleteResponse(delResponse:any){
      this.refresh();
      this.del=delResponse;
  }
  onEdit(index) : void {
    //console.log(this.exercises[index]);
    //index holds the index of exercises which has been requested to edit.
    //for the given exercise, generate a modal dialog
    //console.log(this.paginator._pageIndex * this.paginator._pageSize + index );
    let dialogRef = this.dialog.open(ExerciseDialogComponent, {
      width: '1000px',
      data: { 
        exercise: this.exercises[this.paginator.pageIndex * this.paginator.pageSize + index ],
        float:'always',
        update:true
        
      }
    });
    dialogRef.afterClosed()
      .subscribe(selection => {
        this.refresh();
      });
  }
  onCreate() : void {
    let dialogRef = this.dialog.open(ExerciseDialogComponent, {
      width: '1000px',
      data: { 
        float:'auto',
        update:false
      }
    });
    dialogRef.afterClosed()
      .subscribe(selection => {
        this.refresh();
      });
  }
  menuMaker() : void {
    // let dialogRef = this.dialog.
  }
  

//dropdown stuff

  ColChoose = new FormControl();

  ColList = [
    'Name',
    'Description',
    'Objectives',
    'Author Name',
    'Action Steps',
    'Location',
    'Frequency',
    'Duration',
    'Target Date'
    ];

/// mat table stuff also look at onInitResponse()
  Loading=false;
  displayedColumns = ['button', 'name', ' description', 'objectives'];
  dataSource = new MatTableDataSource<Exercise>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  onSearch(form:any){
    this.Loading=true;
    //console.log(form.value.Search);
    //console.log($('#colChoice').value);
    //console.log(this.ColChoose);
    if (this.ColChoose.value!=null){
      //console.log(this.Col.value.length);
      this.search(form.value.Search, this.ColChoose.value)
    }else{
      //console.log(this.ColList);      
      this.search(form.value.Search, this.ColList)
    }
    //console.log(this.exercises);


    
  }
  newArray: Exercise[]=[];
  search(term, columns){
    this.newArray=[];
    console.log(term);
    console.log(columns);
    for(let i=0; i<this.exercises.length;i++){
      //console.log(i);
      for(let j=0; j<columns.length;j++){
        //console.log(j);
        /*'Name',
          'Description',
          'Objectives',
          'Author Name',
          'Action Steps',
          'Location',
          'Frequency',
          'Duration',
          'Target Date'*/
        switch(columns[j]) {
          case "Name":
            if(this.exercises[i].name.toLowerCase().includes(term.toLowerCase())){
              //console.log(this.exercises[i].name);
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Description":
            //console.log(this.exercises[i].description);
            if(this.exercises[i].description.toLowerCase().includes(term.toLowerCase())){
              console.log(this.exercises[i].description.toLowerCase());
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Objectives":
            if(this.exercises[i].objectives.includes(term)){
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Author Name":
            if(this.exercises[i].authorName.includes(term)){
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Action Steps":
            if(this.exercises[i].actionSteps.includes(term)){
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Location":
            if(this.exercises[i].location.includes(term)){
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Frequency":
            if(this.exercises[i].frequency==term){
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
          case "Duration":
            if(this.exercises[i].duration==term){
              j=10;
              this.newArray.push(this.exercises[i]);
            }
            break;
        }//*/
      }
    }
    console.log(this.newArray);
    this.dataSource = new MatTableDataSource<Exercise>(this.newArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Loading=false;
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
/*
  ColList = [
    'Name',
    'Description',
    'Objectives',
    'Author Name',
    'Action Steps',
    'Location',
    'Frequency',
    'Duration',
    'Target Date'
    ];//*/

const ELEMENT_DATA: Exercise[] = [];

