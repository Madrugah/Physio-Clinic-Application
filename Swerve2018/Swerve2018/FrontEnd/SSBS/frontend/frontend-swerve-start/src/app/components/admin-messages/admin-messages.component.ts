import { Component, OnInit, ViewChild } from '@angular/core';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { PatientFunctionsManageService } from '../../services/patient-functions-manage.service';
import { AuthManageService } from '../../services/auth-manage.service'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit {
  isAllowed;
  token;
  isPhys;
  isAdmin;
  listOfUnread: Message[]=[];
  displayedColumns = ['button', 'email'];
  dataSource = new MatTableDataSource<Message>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private physTools:PhysicianManageProfileService, 
              private patientTools:PatientFunctionsManageService,
              private router:Router,
              private authServ: AuthManageService) {}
  
  editProfileNav(email){
    //console.log(email);
    const url = '/view-profile/' + email;
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    //if user has no token, they are redirected to the main page

    
     this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.isAdmin = validateRaw.data;
      this.isPhys = validateRaw.data3; 
      // if they are a physician or admin allow them to say in the component and get all unread messages
      if(this.isAdmin || this.isPhys){ 
            this.isAllowed = true; 
            this.patientTools.getPendingMessages().then((ans) =>{
      var data = JSON.parse(ans._body);
      //if there are multiple unread messages from the same patient, remove all redundancies
      for(var i=0;i<data.messages.length;i++){
        var thisEmail= data.messages[i].email;
        this.listOfUnread.push(data.messages[i]);
        for(var j=i+1;j<data.messages.length;j++){
          if(data.messages[j].email== thisEmail){
            data.messages.splice(j, 1);
            j--;
          }
        }
      }
      //refresh the table with all unread messages
      this.dataSource = new MatTableDataSource<Message>(this.listOfUnread);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
          } else{   //if not an admin or physician, send them to the main page           
            this.router.navigateByUrl('');
          }  
        });
        
  }

}//an interface to represent the message data
export interface Message {
    parentId: String;
    myMessage: String;
    email: String;
    date: String;
    viewed: Boolean;
    senderEmail: String;
}
//empty array to initialize table
const ELEMENT_DATA: Message[] = [];