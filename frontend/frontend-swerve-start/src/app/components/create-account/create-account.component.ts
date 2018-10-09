import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  x;
  constructor(private profileService: PhysicianManageProfileService, private router: Router) { }

  ngOnInit() {
    this.profileService.getProfiles().then((same) =>{
     this.x = JSON.parse(same._body).data;
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
      this.profileService.createProfile(frm)
      .then((respond) => {
         const parsedOut = JSON.parse(respond._body);
          if (parsedOut.type) {
            if (parsedOut.data.isAdmin) {
              const obj = JSON.parse(respond._body);
              localStorage.setItem('token', obj.data.token);
             this.router.navigateByUrl('admin-dashboard');
            }else {
              const obj = JSON.parse(respond._body);
              localStorage.setItem('token', obj.data.token);
              this.router.navigateByUrl('create-profile');
            }
          } else {
            alert(parsedOut.data);
          }
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
