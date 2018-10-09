import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManageService } from '../../services/auth-manage.service' 

@Component({
  selector: 'app-home-picture',
  templateUrl: './home-picture.component.html',
  styleUrls: ['./home-picture.component.css']
})
export class HomePictureComponent implements OnInit {

  isAdmin;
  isPhys;
  email;
  token;
  constructor(private router: Router, private authServ: AuthManageService ) { }

  ngOnInit() {
  
    
  }
  //redirect upon logging in
  redirectLoggedIn(){
    this.token = localStorage.getItem('token'); 
    if(this.token == null || this.token == undefined || this.token =="null"){
      this.router.navigateByUrl("/create-account"); 
    } else {
      this.authServ.validate().then( (resp) => {
        const validateRaw = JSON.parse(resp._body); 
        this.isAdmin = validateRaw.data;
        this.isPhys = validateRaw.data3; 
        this.email = validateRaw.data4;
        // if they are a physician or admin
        if(this.isAdmin || this.isPhys){  
          this.router.navigateByUrl('/admin-dashboard');
        } else { 
          this.router.navigateByUrl('/view-profile/'+this.email); 
        }
      }); 
    } 
  }
}
