import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { AuthManageService } from '../../services/auth-manage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-edit-admin',
  templateUrl: './home-edit-admin.component.html',
  styleUrls: ['./home-edit-admin.component.css']
})
export class HomeEditAdminComponent implements OnInit {

  constructor(private profileService: PhysicianManageProfileService, private router: Router, private authServ: AuthManageService) { }
  TLT;
  TLS;
  TLB;
  TRT;
  TRB;
  BRT;
  BRB;

  // Validation literals
  token;
  adminStatus = false;
  isAllowed = false;
  

  ngOnInit() {
    //TODO Load the values from the DB in a get request and then update them 
    
    
    // Validation Level: Admin Only
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data; 
      if(!validateRaw.data){
        this.router.navigateByUrl('');
      } else {
        this.isAllowed = true;
      }
    }); 
    //populate the title page with the data from database
    this.authServ.populateTitlePage().then((ans) =>{
      const resp = JSON.parse(ans._body);
      this.TLT = resp.data.TLT;
      this.TLS = resp.data.TLS;
      this.TLB = resp.data.TLB;
      this.TRT = resp.data.TRT;
      this.TRB = resp.data.TRB;
      this.BRT = resp.data.BRT;
      this.BRB = resp.data.BRB; 
    });
  }
  //edit the title page based on values from the form
  onButtonPress(form: NgForm) : void{
    const frm = form.value; 
    this.profileService.createTitlePage(frm)
      .then((respond) => {
         const parsedOut = JSON.parse(respond._body);
            alert(parsedOut.data);
      })
      .catch((err) => {
        //console.log(err);
      });
    }
  }

