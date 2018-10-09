import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { Router } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-stepper',
  templateUrl: './create-stepper.component.html',
  styleUrls: ['./create-stepper.component.css']
})
export class CreateStepperComponent implements OnInit {
  emailAccepted=false;
  x;
  maxDate = new Date();
  
    userForm = new FormGroup({
       emailHolder: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
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
              private router: Router) { }

  ngOnInit() {
    this.profileService.getProfiles().then((same) =>{
     this.x = JSON.parse(same._body).data;
      });
  }
    
  submitForm(){
    
  }
  
  getAge() {
    var date=new Date();
    date.setTime(date.getTime()-this.userForm.value.DOB.getTime());
    this.userForm.controls.age.setValue(date.getFullYear()-1970);
  }
  
  checkEmail(){
      if (this.userForm.value.emailHolder == undefined || this.userForm.value.emailHolder == "undefined"){
            alert("Please fill in an email address");
      }
      else if (this.userForm.value.emailHolder.length != 0 && !this.ValidateEmail(this.userForm.value.emailHolder)){
            alert("Invalid Email");
      }
      else if(this.userForm.value.password == undefined || this.userForm.value.password == "undefined") {
            alert("Please fill in an password ");
      }
      else{
        this.profileService.checkEmail(this.userForm.value.emailHolder).then((respond) => {
          const parsedOut = JSON.parse(respond._body);
          if(parsedOut.type){
            alert("That email has already been used")
          } else {
            alert("Success");
            this.emailAccepted=this.userForm.value.emailHolder;
            this.userForm.controls.email.setValue(this.userForm.value.emailHolder);
            this.userForm.controls.emailHolder.reset({value:this.userForm.value.emailHolder, disabled: true});
          }
        });
      }
  }
  
  changeEmail(){
    this.emailAccepted=false;
    this.userForm.controls.emailHolder.reset({value:this.userForm.value.emailHolder, disabled: false});
  }
  
  //   onButtonPress2(form: NgForm): void {
  //     const frm = form.value;
  //     console.log(frm.email);
  //     if (frm.email == undefined || frm.email == "undefined"){
  //           alert("Please fill in an email address");
  //     }
  //     else if (frm.email.length != 0 && !this.ValidateEmail(frm.email)){
  //           alert("Invalid Email");
  //     }
  //     else if(frm.password == undefined || frm.password == "undefined") {
  //           alert("Please fill in an password ");
  //     }
  //     else{
  //     this.profileService.createProfile(frm)
  //     .then((respond) => {
  //       const parsedOut = JSON.parse(respond._body);
  //         if (parsedOut.type) {
  //           if (parsedOut.data.isAdmin) {
  //             const obj = JSON.parse(respond._body);
  //             localStorage.setItem('token', obj.data.token);
  //           this.router.navigateByUrl('admin-dashboard');
  //           }else {
  //             const obj = JSON.parse(respond._body);
  //             localStorage.setItem('token', obj.data.token);
  //             this.router.navigateByUrl('create-profile');
  //           }
  //         } else {
  //           alert(parsedOut.data);
  //         }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }
  
  
  onSubmit(): void {
    
    var frm = this.userForm.value;
    console.log(frm)
    if (frm.givenName== undefined || frm.givenName == "undefined") {
          alert("Please fill in a name")
    }
    else if (frm.familyName== undefined || frm.familyName == "undefined") {
          alert("Please fill in a family name")
    }
    else if(frm.DOB == undefined || frm.DOB == "undefined") {
          alert("Please fill in a Date of Birth")
    }
    else if(frm.postalCode== undefined || frm.postalCode == "undefined") {
          alert("Please fill in a postal Code ")
    }
    else if(frm.phone== undefined || frm.phone == "undefined") {
          alert("Please fill in a phone number ")
    }
    else if(frm.country == undefined || frm.country == "undefined") {
          alert("Please fill in a country ")
    }
    else if(frm.province == undefined || frm.province == "undefined") {
          alert("Please fill in a province ")
    }
    else if(frm.city == undefined || frm.city == "undefined") {
          alert("Please fill in a city ")
    }
    else{
      this.profileService.createAccountAndProfile(frm).then((respond) => {
        respond=JSON.parse(respond._body);
        
        console.log(respond);
        
        if(respond.type){
          alert("success");
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
