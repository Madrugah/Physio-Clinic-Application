import { Component, OnInit, Inject } from '@angular/core';
import { ManageExerciseService } from '../../../services/manage-exercise.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';

declare var jquery:any;
declare var $ :any;
export class FileHolder {
  public serverResponse: any;
  public pending: boolean = false;
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.css']
})
export class ExerciseDialogComponent implements OnInit {
  ExerciseDialogRef: MatDialogRef<ExerciseDialogComponent>;
  update;
  exercise;
  response;
  files =[];
  stepLength=1;
  
  userForm = new FormGroup({
       name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       authorName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       location:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       description:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       objectives: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       //actionSteps: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       actionSteps: new FormArray([
        new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
       ]),
       frequency: new FormControl('', [Validators.required, Validators.minLength(0)]),
       duration: new FormControl('', [Validators.required, Validators.minLength(0)]),
       targetDate: new FormControl('', [Validators.required, Validators.minLength(0)])
  });  
  
  
  constructor(private dialog: MatDialog, private router: Router, 
   private authServ: AuthManageService, private exerciseService:ManageExerciseService, @Inject(MAT_DIALOG_DATA) private data: any) {
    console.log(this.data.update);
    this.update=this.data.update;
    this.exercise=this.data.exercise;
    if(this.update){
      console.log(this.exercise);
      this.files = this.exercise.multimediaURL;
      for(let i = 1;i<(<FormArray>this.exercise.actionSteps).length; i++){
        (<FormArray>this.userForm.controls.actionSteps).push(new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]));
      }
      this.userForm.controls.name.setValue(this.exercise.name);
      this.userForm.controls.authorName.setValue(this.exercise.authorName);
      this.userForm.controls.location.setValue(this.exercise.location);
      this.userForm.controls.description.setValue(this.exercise.description);
      this.userForm.controls.objectives.setValue(this.exercise.objectives);
      this.userForm.controls.actionSteps.setValue(this.exercise.actionSteps);
      this.userForm.controls.frequency.setValue(this.exercise.frequency);
      this.userForm.controls.duration.setValue(this.exercise.duration);
      this.userForm.controls.targetDate.setValue(this.exercise.targetDate);
    }
    console.log(this.exercise);
  }

  openAddFileDialog() {
    this.ExerciseDialogRef = this.dialog.open(ExerciseDialogComponent);
  }

  ngOnInit() {
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      console.log('recieved from auth:');
      console.log(validateRaw);
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      } else {
       // code here if ya want bud :^) 
      }
    });
  
  }
  onSubmit(){
    var frm:any=this.userForm.value;
    frm.multimediaURL=this.files;
    //console.log(this.userForm.controls.actionSteps);
    frm.actionSteps=this.userForm.controls.actionSteps.value;
    if (this.update) frm._id=this.exercise._id;
    console.log(frm);
    
    //console.log(this.exName.value);
    //const frm = this.userForm.controls;
    if (frm.description.length < 3)
    {
      alert("Description too short");
      return;
    }
    if (frm.description.length > 100)
    {
      alert("Description too long");
      return;
    }
    if (frm.name.length < 3)
    {
      alert("Exercise Name too short");
      return;
    }
    if (frm.name.length > 100)
    {
      alert("Excerise Name too long");
      return;
    }
    if (frm.objectives.length < 3)
    {
      alert("Objectives too short");
      return;
    }
    if (frm.objectives.length > 100)
    {
      alert("Objectives too long");
      return;
    }
    for (let i = 0;i<frm.actionSteps.length;i++){
      if (frm.actionSteps[i].length < 3)
      {
        alert("action step "+ (i+1) +" too short");
        return;
      }
      if (frm.actionSteps[i].length > 300)
      {
        alert("action step "+ (i+1) +" too long");
        return;
      }
    }
    console.log("wdff");
    this.exerciseService.createExercise(this.onResponse.bind(this), frm);  //send the exercise to the service 
  }
  
  onResponse(x: any){
    if (x.status == 200){
      this.response = 'Success';
    console.log('response ' + x.status);
      this.dialog.closeAll();
    } else{
      this.response = 'There was an issue';
    }
  }
    onUploadFinished(file: FileHolder) {
    console.log(JSON.stringify(file.src.length));
    this.files.push(file.src);
    console.log(this.files);
  }
  onRemoved(file: FileHolder) {
    console.log(JSON.stringify(file.src.length));   
    this.files.splice(this.files.indexOf(file.src), 1); 
    console.log(this.files);
  }
  onX(){
    console.log(this.userForm);
  }
  //$('#')
  customStyle = {
    selectButton: {
      //style here
    },
    clearButton: {
      "display":"none",
    },
    layout: {
      //style here
    },
    previewPanel: {
      //style here
    }
  }
  steps(x:boolean){
    if (x){
      (<FormArray>this.userForm.controls.actionSteps).push(new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]));
    } else{
      if((<FormArray>this.userForm.controls.actionSteps).length>1) 
      (<FormArray>this.userForm.controls.actionSteps).removeAt((<FormArray>this.userForm.controls.actionSteps).length-1);
    }
    console.log(this.stepLength);
  }
}
