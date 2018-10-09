import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { Router } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { AuthManageService } from '../../services/auth-manage.service'
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  emailAccepted=false;
  x;
  maxDate = new Date();
  token;
  isAdmin;
  userForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     terms: new FormControl('', [Validators.required]),
     password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     givenName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     familyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     DOB: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     age: new FormControl({value:'', disabled: true}, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     postalCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     country: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     province: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
     //TODO add a form control for the checkbox 
     //termsHolder: new FormControl('',[])
  });  


  constructor(private profileService: PhysicianManageProfileService, 
              private router: Router,
              private authServ: AuthManageService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.isAdmin = validateRaw.data;
      if(this.isAdmin){ 
          } else{
            alert("Access denied.");
            this.router.navigateByUrl('');
          }  
        });   
    this.profileService.getProfiles().then((same) =>{
     this.x = JSON.parse(same._body).data;
      });
  }
    
  submitForm(){
    
  }
  
  getAge() {//gets relative age
    var date=new Date();
    date.setTime(date.getTime()-this.userForm.value.DOB.getTime());
    this.userForm.controls.age.setValue(date.getFullYear()-1970);
  }

  onSubmit(): void {//on submit take form values and store for the profile
    var frm = this.userForm.value; 
    // console.log(frm);
    // return;
    if (this.userForm.value.email == undefined || this.userForm.value.email == "undefined"){
      alert("Please fill in an email address");
      return;
    }
    else if (this.userForm.value.email.length != 0 && !this.ValidateEmail(this.userForm.value.email)){
      alert("Invalid Email");
      return;
    } 
    else if(this.userForm.value.password == undefined || this.userForm.value.password == "undefined") {
      alert("Please fill in an password ");
      return;
    } 
    else if (frm.givenName== undefined || frm.givenName.length<1) {
      alert("Please fill in a name")
      return;
    }
    else if (frm.terms!= true) {
      alert("please accept our terms of service")
      return;
    }
    else if (frm.familyName== undefined || frm.familyName.length<1) {
      alert("Please fill in a family name")
      return;
    }
    else if(frm.DOB == undefined || frm.DOB.length<1) {
      alert("Please fill in a Date of Birth")
    }
    else if(frm.postalCode== undefined || frm.postalCode.length<1) {
      alert("Please fill in a postal Code ")
      return;
    }
    else if(frm.phone== undefined || frm.phone.length<5) {
      alert("Please fill in a phone number ")
      return;
    }
    else if(frm.country == undefined || frm.country.length<1) {
      alert("Please fill in a country ")
      return;
    }
    else if(frm.province == undefined || frm.province.length<1) {
      alert("Please fill in a province ")
      return;
    }
    else if(frm.city == undefined || frm.city.length<1) {
      alert("Please fill in a city ")
      return;
    }
    else{
      this.profileService.createProfileAdmin(frm).then((respond) => {
        respond=JSON.parse(respond._body); 
        if(respond.type){
            this.snackBar.open('Success', 'Ok',  {
            duration: 3000
          });

          this.router.navigateByUrl('login');       
        }else{
          alert("unsuccessful");
        }
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
