import { Component, OnInit, Input } from '@angular/core';
import { PatientFunctionsManageService } from '../../../services/patient-functions-manage.service';
import { PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  email;
  newMessage
  myEmail
  messagesFull=[];
  @Input() messages: any;
    userForm = new FormGroup({
       message: new FormArray([]),
       title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
       newMessage: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  });  
        // (<FormArray>this.userForm.controls.message).push(new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]));

  
  
  constructor(private router: Router , private route: ActivatedRoute,
              private profService: PhysicianManageProfileService, 
              private patientTools: PatientFunctionsManageService) { 
    this.email = this.route.snapshot.params.email;
    //retrieve profile and get email
    this.profService.retrieveProfile2(localStorage.getItem('token')).then((same) =>{ 
      const emailData = JSON.parse(same._body);
      this.myEmail = emailData.data;
    });
  }

  ngOnInit() {
  }
  ngOnChanges(...args: any[]) { //listen for changes and update messages bases on them
    var s = [{email:this.email}];
    this.patientTools.getMessages(s).then((ans) =>{
      const data = JSON.parse(ans._body); 
      for (var i = 0;i<data.messages.length;i++){
        data.messages[i].children = [];
      }
      for (var i = 0;i<data.messages.length;i++){
        if(data.messages[i].parentId==undefined){
          continue;
        }
        var theSplit = data.messages[i].parentId.split("Title<>:");
        if (theSplit.length==2){//data.messages[i].parentId==1 || data.messages[i].parentId==0){
          (<FormArray>this.userForm.controls.message).push(new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]));
          this.messagesFull.push(data.messages[i]);
          data.messages[i].parentId=theSplit[1];
        } else {
          for (var j = 0;j<data.messages.length;j++){
            if (data.messages[j]._id == data.messages[i].parentId){
              data.messages[j].children.push(data.messages[i]);
              if (data.messages[j].date < data.messages[i].date){
                data.messages[j].date = data.messages[i].date
              }
              if (data.messages[i].viewed==false){
                data.messages[j].viewed = false;
              }
            }
          }
        }
        
        //this.messagesFull[0].children.push(data.messages[i])
      } 
      this.sort();
      this.setDate();

    });
  }  
  sort(){//sort messages
    this.messagesFull.sort(function(a, b) {
      return b.date - a.date;
    });
  }
  setDate(){ //set message date
    for (let message of this.messagesFull){
      var x =  parseInt(message.date);
      x-=14400000;
      var y="Sent: " + (new Date(x)).toUTCString();
      var z = y.split("GMT"); 
      message.stringDate = z[0];
    }
  }
  sendMessage(parentId, index){//send message to patient
    if(parentId=="NA"){
      if(this.userForm.value.title.length<3){
        alert("enter a longer title");
        return;
      } else if(this.userForm.value.newMessage.length<5){
        alert("enter a longer message");
        return;
      } 
      var title = "Title<>:" + this.userForm.value.title;
      var time = Date.now();
      var sendmessage= {
        myMessage: this.userForm.value.newMessage,
        parentId: title,
        email: this.email,
        viewed:false,
        date:time,
        senderEmail:this.myEmail
        
      }
      if(this.email!=this.myEmail){
        sendmessage.viewed=true;
      } 
      this.patientTools.sendNewMessage(sendmessage);
      let children = [];
      let strDate ="";
      let message= {
        myMessage: this.userForm.value.newMessage,
        parentId: title,
        email: this.email,
        viewed:false,
        date:time,
        senderEmail:this.myEmail,
        children: children,
        stringDate:strDate
      }
      if(this.email!=this.myEmail){
        message.viewed=true;
      } 

      message.children=[];
      (<FormArray>this.userForm.controls.message).push(new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]));
      this.messagesFull.reverse();
      this.messagesFull.push(message);
      this.messagesFull.reverse();
      var theSplit = message.parentId.split("Title<>:");
      message.parentId=theSplit[1];
      var x =  parseInt(message.date.toString());
      x-=14400000;
      var y="Sent: " + (new Date(x)).toUTCString();
      var z = y.split("GMT"); 
      message.stringDate = z[0];
    }else{
      if(this.messagesFull[index]._id==undefined){
        alert("please reload the page to respond to this message");
        return;
      }
      if(this.userForm.value.message[index].length<5){
        alert("enter a longer message");
        return;
      } 
      var time = Date.now();
      var message= {
        myMessage: this.userForm.value.message[index],
        parentId: parentId,
        email: this.email,
        viewed:false,
        date:time,
        senderEmail:this.myEmail
      }
      if(this.email!=this.myEmail){
        message.viewed=true;
        this.markViewed(index);
      } 
      this.patientTools.sendNewMessage(message); 
      this.messagesFull[index].children.push(message);
      var x =  parseInt(message.date.toString());
      x-=14400000;
      var y="Sent: " + (new Date(x)).toUTCString();
      var z = y.split("GMT"); 
      this.messagesFull[index].stringDate = z[0];
    }
  }
  markViewed(index){//show message is viewed
    this.patientTools.markMessageViewed(this.messagesFull[index]._id);
    this.messagesFull[index].viewed=true;
    for(let message of this.messagesFull[index].children){
      this.patientTools.markMessageViewed(message._id);
      message.viewed=true
    }
  }
} 

export class Message {
    _id?:string;
    parentId: String;
    myMessage: String;
    email: String;
    viewed: Boolean;
}
