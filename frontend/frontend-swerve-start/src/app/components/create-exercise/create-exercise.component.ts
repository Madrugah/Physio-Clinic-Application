import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManageExerciseService } from '../../services/manage-exercise.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { AuthManageService } from '../../services/auth-manage.service';
import { Router } from '@angular/router';
const URL = ''

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.css']
})

export class CreateExerciseComponent implements OnInit {
  
  adminStatus = false;
  physStatus = false;
  
  public files: UploadFile[] = [];

    public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      file.fileEntry.file(info => {
        console.log(info);
      });
    }
  }
  
   public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }
  
  constructor(private exerciseService: ManageExerciseService,  private router: Router, 
    private authServ: AuthManageService) { }
  response;
  ngOnInit() { 
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      console.log('recieved from auth:');
      console.log(validateRaw);
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      } else {
        // put ur code here frands :^D
      }
    });
    // generate exercises list from GET
    // send list to page
    // this.exerciseService.getExercises();
  }
  onSubmit(form: NgForm){ // when they submit create exercise form
    const frm = form.value;
    console.log(frm);
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
    this.exerciseService.createExercise(this.onResponse.bind(this), frm);  //send the exercise to the service  
  }
  
  onResponse(x: any){
    console.log('response' + x.status);
    if (x.status == 200){
      this.response = 'Success';
    } else{
      this.response = 'There was an issue';
    }

  }
  
  onClick(){
  }

}
