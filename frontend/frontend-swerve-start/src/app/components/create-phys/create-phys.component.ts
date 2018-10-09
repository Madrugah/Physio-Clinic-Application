import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { AuthManageService } from '../../services/auth-manage.service';
import { NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-phys',
  templateUrl: './create-phys.component.html',
  styleUrls: ['./create-phys.component.css']
})
export class CreatePhysComponent implements OnInit {
  x;
  token;
  isAdmin;
  constructor(private profileService: PhysicianManageProfileService, private router: Router, private authServ: AuthManageService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    this.profileService.getProfiles().then((same) =>{
     this.x = JSON.parse(same._body).data;
      });
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.isAdmin = validateRaw.data;
      if (!this.isAdmin){
        this.router.navigateByUrl('');
      }
    });
  }
    
  
    onButtonPress(form: NgForm): void {
      const frm = form.value;
      console.log(frm.email);
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
      this.profileService.createProfilePhys(frm)
      .then((respond) => {
        const parsedOut = JSON.parse(respond._body);
        alert(parsedOut.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  
  
  ValidateEmail(mail): Boolean   //Validates the email with proper characters
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }  
    return (false)  
  }  
}