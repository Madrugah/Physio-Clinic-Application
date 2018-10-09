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

  ngOnInit() {//validates account
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data; 
      if( !validateRaw.data){ // means they are not admin
        this.router.navigateByUrl('');
      } else {
        
      }
    });
  }

}
