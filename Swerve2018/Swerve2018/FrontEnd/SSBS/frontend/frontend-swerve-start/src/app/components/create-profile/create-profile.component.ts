import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { NgForm } from '@angular/forms';
import { Profile } from '../../models/profile';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthManageService } from '../../services/auth-manage.service';
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  adminStatus = false;
  userStatus = false;
  x;
  token;
  age;
  email;
  DOB;
  givenName;
  familyName;
  postalCode;
  phone;
  country;
  province;
  city;
  oldPass;
  confirmPass;
  newPass;
  email2;
  isReset = true;
  maxDate = new Date();
  @Input() showAccount;
  
  constructor(private profileService: PhysicianManageProfileService, private router: Router, 
    private authServ: AuthManageService, private route: ActivatedRoute) { }

  ngOnInit() { //gets the token of the user
      this.token = localStorage.getItem('token');
      if (this.token == null || this.token == "null" || this.token == undefined || this.token == "undefined"){
        alert("Redirecting...");
        this.router.navigateByUrl('');
      }
      //gets email and validates if the user is an admin
      this.email2 = this.route.snapshot.params.email;
      this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.adminStatus = validateRaw.data;
      if(validateRaw.data || validateRaw.data3){
        this.isReset = false;//checks to see if the account has been reset
      }
      if (!validateRaw.data && !validateRaw.data3){
        this.userStatus = true;
        //if reset, reset data
          this.authServ.isReset().then ( (resp) => {
            const isResetData = JSON.parse(resp._body).data;
            if(isResetData == true){
                this.isReset = true;
              }
              else{
                this.isReset = false;
              }
          })
      }
      if(validateRaw.data){
      } else {
        this.profileService.getProfiles().then((same) =>{
            this.x = JSON.parse(same._body).data;
        }); 
      }
      if (!this.adminStatus){//if not an admin, populate fields with the patient's profile info
      this.profileService.retrieveProfile1(this.token)
        .then((respond) => { 
          let boi = JSON.parse(respond._body).data; 
          var now = new Date();
          if(boi.DOB!=undefined){
          var born = new Date(boi.DOB);
          this.age = Math.floor((now.getTime() - born.getTime())/ (365 * 24 * 60 * 60 * 1000));
          }
        
          var DOB2 = new Date(boi.DOB);
          this.DOB = DOB2.toISOString().split('T')[0];
          this.givenName = boi.givenName;
          this.familyName = boi.familyName;
          this.postalCode = boi.postalCode;
          this.phone = boi.phone;
          this.country = boi.country;
          this.email = boi.email;
          this.province = boi.province;
          this.city = boi.city;
        });
      }
      else {//if cant get by token, get my email
        this.profileService.retrieveProfile(this.email2)
        .then((respond) => { 
          let boi = JSON.parse(respond._body).data; 
          var now = new Date();
          if(boi.DOB!=undefined){
          var born = new Date(boi.DOB);
          this.age = Math.floor((now.getTime() - born.getTime())/ (365 * 24 * 60 * 60 * 1000));
          }
        
          var DOB2 = new Date(boi.DOB);
          this.DOB = DOB2.toISOString().split('T')[0];
          this.givenName = boi.givenName;
          this.familyName = boi.familyName;
          this.postalCode = boi.postalCode;
          this.phone = boi.phone;
          this.country = boi.country;
          this.email = boi.email;
          this.province = boi.province;
          this.city = boi.city;
        });
      }
    }); 
      return this.age;
  }
    
  
    onButtonPress(form: NgForm): void {//on submit, check if fields are proper and then update profile fields
      const frm = form.value;
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
        var r = confirm("Are you satisfied with your changes?");
        if(r){
        if(!this.adminStatus){//if not an admin, edit the profile and redirect to view profile
          this.profileService.editProfile(frm, this.token)
          .then((respond) => {
            const respondedData = JSON.parse(respond._body); 
            this.router.navigateByUrl('/view-profile/'+ this.email);
          })
          .catch((err) => {
          //console.log(err);
          });
        }
        else{//an admin has a different edit profile function
          this.profileService.editProfile2(frm, this.email2)
          .then((respond) => { 
            const respondedData = JSON.parse(respond._body);
            alert(respondedData.data);
            this.router.navigateByUrl('/view-profile/'+ this.email);
          })
          .catch((err) => {
          //console.log(err);
          });
        }
        }
    }
  }
  
  getAge(form: NgForm) {
    var f = form.value;
    if (f.DOB != "undefined") { 
      var now = new Date();
      var born = new Date(f.DOB);
      if(born.getTime() > now.getTime()){
        return
      }//gets the relative age
      this.age = Math.floor((now.getTime() - born.getTime())/ (365 * 24 * 60 * 60 * 1000)); 
      return this.age;
    }
  }
  
  changePass(){
    if(this.newPass != this.confirmPass || this.newPass ==undefined || this.newPass == "" || this.newPass == null || this.newPass == "null"){
      // flag -> do this in a less intrusive way
      alert("Error! Passwords must match and can not be empty");
    } else {
      //updates the password of the profile
      this.profileService.updatePass(this.newPass, this.oldPass, this.email2).then((rcv) => {
        let parsed = JSON.parse(rcv._body);  
        alert(parsed.data);
        location.reload();
      });
    }
  }
  
    changePassAdmin(){//an admin can change a patient's password, this will reset patient's profile until they log in
    if(this.newPass != this.confirmPass || this.newPass ==undefined || this.newPass == "" || this.newPass == null || this.newPass == "null"){
      // flag -> do this in a less intrusive way
      alert("Error! Passwords must match and can not be empty");
    } else {
      this.profileService.updatePassAdmin(this.newPass, this.email2).then((rcv) => {
        let parsed = JSON.parse(rcv._body);
        alert(parsed.data);
        location.reload();
      });
    }
  }
}


