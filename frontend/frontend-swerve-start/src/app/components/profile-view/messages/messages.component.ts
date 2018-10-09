import { Component, OnInit, Input } from '@angular/core';
import { PatientFunctionsManageService } from '../../../services/patient-functions-manage.service';
import { PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  email;
  newMessage
  myEmail
  messagesFull=[{},{},{}];
  @Input() messages: any;
  constructor(private router: Router , private route: ActivatedRoute,
              private profService: PhysicianManageProfileService, 
              private patientTools: PatientFunctionsManageService) { 
    this.email = this.route.snapshot.params.email;
    this.profService.retrieveProfile2(localStorage.getItem('token')).then((same) =>{
        console.log("This is where I'm looking");
        console.log(same);
      const emailData = JSON.parse(same._body);
      this.myEmail = emailData.data;
    });
  }

  ngOnInit() {
  }
  ngOnChanges(...args: any[]) {
    console.log(this.messages)
    var s = [{
      email:this.email
    }]
    this.patientTools.getMessages(s).then((ans) =>{
      const data = JSON.parse(ans._body);
      console.log(data.messages);
      this.messagesFull=data.messages
    });
  }  

  sendMessage(parentId){
    var time = Date.now();
    var message= {
      myMessage: "hello",
      parentId: parentId,
      email: this.email,
      viewed:false,
      date:time,
      senderEmail:this.myEmail
    }
    console.log(message);
    this.patientTools.sendNewMessage(message);
  }
}
// var MessageSchema   = new Schema({
//     parentId: String,
//     myMessage: String,
//     email: String,
//     date: String,
//     viewed: Boolean,
//     senderEmail: String,
// });