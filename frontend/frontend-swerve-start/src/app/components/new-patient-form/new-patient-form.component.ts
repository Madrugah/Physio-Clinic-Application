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
  
profileGet(){
  this.picture1="https://www.alvinailey.org/sites/default/files/styles/slideshow_image/public/melanie-person.jpg";
  this.picture2="http://www.livingmagazine.net/wp-content/uploads/7-15-Wellness_Body-Scan_web.jpg";
  this.picture3="https://www.alvinailey.org/sites/default/files/styles/slideshow_image/public/melanie-person.jpg";
  this.picture4="http://www.livingmagazine.net/wp-content/uploads/7-15-Wellness_Body-Scan_web.jpg";
  this.name="John Smith"
  this.injury="Broken Knees"
  this.notes="Notes?"

}




  // showCoords(event) {

  //   //traces the mouse, renders the crosshairs on the canvas on layer 2
  //   var x = event.clientX;
  //   var y = event.clientY;
  
  //   this.newMethod(x, y);
    
  //   //clears layer 2 whenever the mouse is moved or else all of the lines would persist
  //   var c =  <HTMLCanvasElement> document.getElementById("layer2");
  //   var ctx = c.getContext("2d");
  //   ctx.clearRect(0, 0, c.width, c.height);  
  //   this.drawXY(x,y)
  // }

  // private newMethod(x: any, y: any) {
  //   console.log(x, y);
  // }

  // drawXY(x,y){
    
  //   //code to actually render the crosshairs on layer 2
  //   var img = <HTMLCanvasElement> document.getElementById("person");
  //   var c = <HTMLCanvasElement> document.getElementById("layer2");
  //   var ctx = c.getContext("2d");
  //   //Horizontal
  //   ctx.beginPath();
  //   ctx.moveTo(0, Math.min(img.height, y)-64);
  //   ctx.lineTo(img.width, Math.min(img.height, y)-64);
  //   ctx.stroke();
  //   //Vertical
    
  //   ctx.beginPath();
  //   ctx.moveTo(Math.min(x, img.width), 0);
  //   ctx.lineTo(Math.min(x, img.width), img.height);
  //   ctx.stroke();
  // }

  // saveCanvas(e){
  //   //begining is similar to drawXY, but it occurs on canvas layer 3
  //   var x = e.clientX
  //   var y = e.clientY
  
  //   //for height and width
  //   var img = <HTMLCanvasElement> document.getElementById("person");
  //   var c = <HTMLCanvasElement> document.getElementById("layer3");
  //   var ctx = c.getContext("2d");
  //   ctx.clearRect(0, -64, c.width, c.height);  
    
  //   //Horizontal
  //   ctx.beginPath();
  //   ctx.moveTo(0, Math.min(img.height, y-64));
  //   ctx.lineTo(img.width, Math.min(img.height, y-64));
  //   ctx.stroke();
  //   //Vertical
  //   ctx.beginPath();
  //   ctx.moveTo(Math.min(x, img.width), 0);
  //   ctx.lineTo(Math.min(x, img.width), img.height);
  //   ctx.stroke();
   
  //   //this is the crosshair canvas image
    
  //   //to clear the creation canvas for demo purposes
  //   var d = document.getElementById("editor")
  //   d.innerHTML = "";
  
  //   var crossHair = ctx.getImageData(0, -64, img.width, img.height);
    
  //   console.log(img);
  //   //not done 
  //   this.saveNewImage(img, crossHair)
  
  //   //render the image for demonstration purposes
  //   this.loadImage(img, crossHair)
  
  // }

  // loadImage(personImage, crossHairs){
  //   //renders the image so long as personImage is an html <img> and crossHairs is a canvas.getContext().getImageData(0, 0, img.width, img.height)
  //   var canvas = <HTMLCanvasElement> document.getElementById("layer1New");
  //   var ctx = canvas.getContext("2d");
  //   var img = personImage
  //   ctx.drawImage(img, 0, 0);
  
  //   canvas = <HTMLCanvasElement> document.getElementById("layer2New");
  //   ctx = canvas.getContext("2d");
  //   img = crossHairs
  //   ctx.putImageData(img, 0, 0);
  // }

  // saveNewImage(person, crosshair){
  //   //preson is an html <img>, and crosshair is a canvas.getContext().getImageData(0, 0, img.width, img.height)
  
  //   //Write your own code to save this to your DB
  
  // }
}

// window.onload = function () {
//   var canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
//   var ctx = canvas.getContext("2d");
//   var img = document.getElementById("person");

//   //DOM bug that the page has to reload in order to use this image and not the image within the html
//   //target image //img.src="http://www.cgf.gr/images/stories/tutorials/maya/modelling_a_human.jpg" 

//   ctx.drawImage( <HTMLCanvasElement> img, 0, 0);
// };