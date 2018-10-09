import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { Router } from '@angular/router';
import { AuthManageService } from '../../services/auth-manage.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  x;
  isAdmin = false;
  isPhys = false;
  token;
  constructor(private profileService: PhysicianManageProfileService, private router: Router, private authServ:AuthManageService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.isAdmin = validateRaw.data;
      this.isPhys = validateRaw.data3;
      if(this.isAdmin || this.isPhys){ 
          } else{
            alert("Access denied.");
            this.router.navigateByUrl('');
            
          }  
        });    
    

    this.profileService.getProfiles().then((same) =>{
     this.x = JSON.parse(same._body).data;
      });//get the profiles and store them as x
    
  }
  
    onButtonPress(form: NgForm): void {
      const frm = form.value; //check for valid inputs
      if (frm.email == undefined || frm.email == "undefined"){
            alert("Please fill in an email address");
      }
      else if (frm.email.length != 0 && !this.ValidateEmail(frm.email)){
            alert("Invalid Email");
      }
      else if(frm.password == undefined || frm.password == "undefined") {
            alert("Please fill in an password ");
      }
      else{
      this.profileService.adminCreateProfile(frm)
      .then((respond) => {//if proper inputs, give the account a token and create a profile for it
         const parsedOut = JSON.parse(respond._body);
            alert(parsedOut.data);
      })
      .catch((err) => { 
      });
    }
  }
  
  
  ValidateEmail(mail): Boolean   //Validates the email with proper characters
  {  
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
      return (true)  
    }
    else
    {
      return (false)  
    }  
  }
}