import { Component, OnInit } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { AuthManageService } from '../../services/auth-manage.service';
import { NgForm } from '@angular/forms';
// import { NgForm } 

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private profileService: AuthManageService) { }

  ngOnInit() {
  }

  onButtonPress(form: NgForm): void {
      const frm = form.value;
      // getting the forms values
      //console.log(frm.email);
      if (frm.email == undefined || frm.email == "undefined"){
            alert("Please fill in an email address");
      }
      else if(frm.password == undefined || frm.password == "undefined") {
            alert("Please fill in an password ")
      }
      else{
        // logging the account in if its correct credentials
      this.profileService.login(frm)
      .then((respond) => {
          //console.log(respond);
        alert(respond.json().resp);
      })
      .catch((err) => {
        //console.log(err);
      });
    }
  }
}
