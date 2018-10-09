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
  
  constructor(private profileService: PhysicianManageProfileService, private router: Router, 
    private authServ: AuthManageService, private route: ActivatedRoute) { }

  ngOnInit() { 
      this.token = localStorage.getItem('token');
      if (this.token == null || this.token == "null" || this.token == undefined || this.token == "undefined"){
        alert("Redirecting...");
        this.router.navigateByUrl('');
      }
      this.email2 = this.route.snapshot.params.email;
      this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      console.log("THIS IS WHERE I BE LOOKING");
      console.log(validateRaw.data);
      this.adminStatus = validateRaw.data;
      if(validateRaw.data || validateRaw.data3){
        this.isReset = false;
      }
      if (!validateRaw.data && !validateRaw.data3){
        this.userStatus = true;
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
      if (!this.adminStatus){
      this.profileService.retrieveProfile1(this.token)
        .then((respond) => {
          console.log("RETRIEVEPROFILE1");
          let boi = JSON.parse(respond._body).data;
          console.log(boi);
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
      else {
        this.profileService.retrieveProfile(this.email2)
        .then((respond) => {
          console.log("RETRIEVEPROFILE");
          let boi = JSON.parse(respond._body).data;
          console.log(boi);
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
      console.log(this.age);
      return this.age;
  }
    
  
    onButtonPress(form: NgForm): void {
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
        if(!this.adminStatus){
          this.profileService.editProfile(frm, this.token)
          .then((respond) => {
            const respondedData = JSON.parse(respond._body);
            console.log(respondedData.data2);
            this.router.navigateByUrl('/view-profile/'+ this.email);
          })
          .catch((err) => {
          console.log(err);
          });
        }
        else{
          this.profileService.editProfile2(frm, this.email2)
          .then((respond) => {
            console.log("This should be the boi");
            const respondedData = JSON.parse(respond._body);
            alert(respondedData.data);
            this.router.navigateByUrl('/view-profile/'+ this.email);
          })
          .catch((err) => {
          console.log(err);
          });
        }
    }
  }
  
  getAge(form: NgForm) {
    var f = form.value;
    if (f.DOB != "undefined") {
      console.log(f.DOB);
      var now = new Date();
      var born = new Date(f.DOB);
      if(born.getTime() > now.getTime()){
        return
      }
      this.age = Math.floor((now.getTime() - born.getTime())/ (365 * 24 * 60 * 60 * 1000));
      console.log(this.age);
      return this.age;
    }
  }
  
  changePass(){
    if(this.newPass != this.confirmPass || this.newPass ==undefined || this.newPass == "" || this.newPass == null || this.newPass == "null"){
      // flag -> do this in a less intrusive way
      alert("Error! Passwords must match and can not be empty");
    } else {
      this.profileService.updatePass(this.newPass, this.oldPass, this.email2).then((rcv) => {
        let parsed = JSON.parse(rcv._body);
        console.log("Hit this"); //Not getting hit, need to see the backend
        console.log(parsed);
        alert(parsed.data);
        location.reload();
      });
    }
  }
  
    changePassAdmin(){
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


