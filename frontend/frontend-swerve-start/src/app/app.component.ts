import { Component, Inject, OnInit } from '@angular/core';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PhysicianManageProfileService } from './services/physician-manage-profile.service';
import { AuthManageService } from './services/auth-manage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token;
  title = 'SelfStart';
  isValid = false;
  email;
  x;
  y;
  adminStatus = false;
  
  constructor(private profService: PhysicianManageProfileService, private authServ: AuthManageService) {
    // this.token = localStorage.getItem('token');
    // if (this.token == "undefined" || this.token == undefined || this.token == null || this.token == "null"){
    //     this.isValid = true;
    //     this.profService.retrieveProfile2(this.token).then((same) =>{
    //       console.log("This is where I'm looking");
    //       console.log(same);
    //     const emailData = JSON.parse(same._body);
    //     this.email = emailData.data;
    //   });
        
    // }
  }
  ngOnInit(){
    this.token = localStorage.getItem('token');
    if (this.token == "undefined" || this.token == undefined || this.token == null || this.token == "null"){
        this.isValid = true;
    }
    else{
      this.authServ.validate()
      .then((respond) => { 
        const obj = JSON.parse(respond._body);
        if (obj.data || obj.data3){
          this.adminStatus = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
      this.profService.retrieveProfile2(this.token).then((same) =>{
          console.log("This is where I'm looking");
          console.log(same);
        const emailData = JSON.parse(same._body);
        this.email = emailData.data;
      });
    }
  }
    logout(): void {
    localStorage.setItem('token', 'null');
    location.reload();
  }
}
  