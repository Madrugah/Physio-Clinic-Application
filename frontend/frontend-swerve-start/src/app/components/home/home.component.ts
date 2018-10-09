import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "BODY SMART";
  
  constructor() { }

  ngOnInit() {
    document.getElementById("LTitle").innerHTML=this.mainT;
    document.getElementById("LSub").innerHTML=this.mainSub;
    document.getElementById("LBody").innerHTML=this.mainB;
    document.getElementById("TRTitle").innerHTML=this.topRightT;
    document.getElementById("TR").innerHTML=this.topRightB;
    document.getElementById("BRTitle").innerHTML=this.botRightT;
    document.getElementById("BR").innerHTML=this.botRightB;
  }
  
  //ToDo, create a route and schema in the backend so that these can be updated through the admin dashboard 
  
  mainT = "Pain Stops Here"
  mainSub = "You already have everything you need to start enjoying life again."
  mainB = "How would you like to understand how the body works, why you experience pain in the body and help lead you towards a more enjoyable pain free life?<br/><br/> Unfortunately, so many people simply don’t understand how the body works. This leaves them feeling helpless when it comes to treating the pain they experience in their body.<br/><br/>How would you like to live pain-free so that you can get back to doing whatyou love most?<br/><br/> As a physiotherapist for over three decades, I can help.<br/><br/> My name is Stephanie Marcotte & I have helped thousands of people free themselves from the pain and suffering caused by issues and imbalances with the musculoskeletal system.<br/><br/> "
  topRightT="Do you suffer from:"
  topRightB ="<ul><li>Muscle strains </li><li>Sprains </li><li>Fractures </li><li>Ligament injuries </li><li>Sports injuries </li><li>Acute pain </li><li>Chronic pain </li><li>Post-injury pain </li><li>Post-surgical pain </li></ul>"
  botRightT =""
  botRightB = "How would you like to understand the reason for your pain, get effective and lasting relief and help lead you to a more enjoyable pain free life. Get back to the things you love. "
 
 

}
