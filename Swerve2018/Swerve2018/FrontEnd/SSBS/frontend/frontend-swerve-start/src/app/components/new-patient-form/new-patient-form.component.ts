import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.css']
})
export class NewPatientFormComponent implements OnInit {
picture1="";
picture2="";
picture3="";
picture4="";
name="";
injury="";
notes="";

  constructor() { }

  ngOnInit() {
 this.profileGet()   
  }
  //get pictures for the new patient form
profileGet(){
  this.picture1="https://www.alvinailey.org/sites/default/files/styles/slideshow_image/public/melanie-person.jpg";
  this.picture2="http://www.livingmagazine.net/wp-content/uploads/7-15-Wellness_Body-Scan_web.jpg";
  this.picture3="https://www.alvinailey.org/sites/default/files/styles/slideshow_image/public/melanie-person.jpg";
  this.picture4="http://www.livingmagazine.net/wp-content/uploads/7-15-Wellness_Body-Scan_web.jpg";
  this.name="John Smith"
  this.injury="Broken Knees"
  this.notes="Notes?"
  }
} 