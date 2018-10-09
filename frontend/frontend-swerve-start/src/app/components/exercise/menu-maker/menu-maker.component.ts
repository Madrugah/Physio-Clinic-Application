import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthManageService } from '../../../services/auth-manage.service';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-maker',
  templateUrl: './menu-maker.component.html',
  styleUrls: ['./menu-maker.component.css']
})
export class MenuMakerComponent implements OnInit {
  // MenuDialogRef: MatDialogRef<MenuMakerComponent>;
  adminStatus = false;
  
  constructor(private router: Router, private authServ: AuthManageService) { }

  ngOnInit() {
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      console.log('recieved from auth:');
      console.log(validateRaw);
      if( !validateRaw.data){ // means they r nutt admin
        this.router.navigateByUrl('');
      } else {
        
      }
    });
  }

}
