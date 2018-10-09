import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManageService } from '../../services/auth-manage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //has the fields for each section of the homepage
  title = "BODY SMART";
  mainT = "Pain Stops Here"
  mainSub = "You already have everything you need to start enjoying life again."
  mainB = "How would you like to understand how the body works, why you experience pain in the body and help lead you towards a more enjoyable pain free life?<br/><br/> Unfortunately, so many people simply don’t understand how the body works. This leaves them feeling helpless when it comes to treating the pain they experience in their body.<br/><br/>How would you like to live pain-free so that you can get back to doing whatyou love most?<br/><br/> As a physiotherapist for over three decades, I can help.<br/><br/> My name is Stephanie Marcotte & I have helped thousands of people free themselves from the pain and suffering caused by issues and imbalances with the musculoskeletal system.<br/><br/> "
  topRightT="Do you suffer from:"
  topRightB ="<ul><li>Muscle strains </li><li>Sprains </li><li>Fractures </li><li>Ligament injuries </li><li>Sports injuries </li><li>Acute pain </li><li>Chronic pain </li><li>Post-injury pain </li><li>Post-surgical pain </li></ul>"
  botRightT =""
  botRightB = "How would you like to understand the reason for your pain, get effective and lasting relief and help lead you to a more enjoyable pain free life. Get back to the things you love. "

  constructor(private auth: AuthManageService) {
    
  }

  ngOnInit() {
  //on auth, populate the titlepage with specific data
    this.auth.populateTitlePage().then((ans) =>{
      const data = JSON.parse(ans._body); 
      
      if (data.data.TLT!=undefined){
        document.getElementById("LTitle").innerHTML=data.data.TLT;
      }
      if (data.data.TLS!=undefined){
        document.getElementById("LSub").innerHTML=data.data.TLS;
      }
      if (data.data.TLB!=undefined){
        if(data.data.TLB.includes('↵')){ 
        }
        document.getElementById("LBody").innerHTML=data.data.TLB;
      }
      if (data.data.TRT!=undefined){
        document.getElementById("TRTitle").innerHTML=data.data.TRT;
      }
      if (data.data.TLB!=undefined){
        document.getElementById("TR").innerHTML=data.data.TRB;
      }
      if (data.data.BRT!=undefined){
        document.getElementById("BRTitle").innerHTML=data.data.BRT;
      }
      if (data.data.BRB!=undefined){
        document.getElementById("BR").innerHTML=data.data.BRB;
      } 
    });
    
  }
  
 
 

}
