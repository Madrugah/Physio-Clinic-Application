import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { AuthManageService } from '../../services/auth-manage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
 adminStatus = false;
 physStatus = false;
 
  constructor(private authServ: AuthManageService, private profileService: PhysicianManageProfileService, private router: Router) { 
    this.authServ.validate()
      .then((respond) => { 
        const obj = JSON.parse(respond._body);
        this.adminStatus = obj.data;
        this.physStatus = obj.data3;
        if (obj.data != true && obj.data3 != true){
          alert("Access denied");
          this.router.navigateByUrl('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    
  }

}
