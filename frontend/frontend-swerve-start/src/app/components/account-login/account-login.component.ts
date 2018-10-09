import { Component, OnInit } from '@angular/core';
import { AuthManageService } from '../../services/auth-manage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  constructor(private authServ: AuthManageService, private router: Router) { }

  ngOnInit() {
    
  }
  onButtonPress(form: NgForm): void {
      const frm = form.value;
      if (frm.email == undefined || frm.email == "undefined"){
            alert("Please fill in an email address");
      }
      else if(frm.password == undefined || frm.password == "undefined") {
            alert("Please fill in an password ")
      }
      else{
      this.authServ.login(frm)
      .then((respond) => { 
        const parsedOut = JSON.parse(respond._body);
          if (parsedOut.type) {
            if (parsedOut.data.isAdmin||parsedOut.data.isPhysician) {
              const obj = JSON.parse(respond._body);
              localStorage.setItem('token', obj.data.token);
              window.location.href = '/admin-dashboard';
              // location.reload();
              // this.router.navigateByUrl('admin-dashboard');
            }else {
              const obj = JSON.parse(respond._body);
              localStorage.setItem('token', obj.data.token);
              const rdrct = '/view-profile/' + frm.email;
              window.location.href = rdrct;
              // this.router.navigateByUrl('patient-profile'); //change later
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

}
