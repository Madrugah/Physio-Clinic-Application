import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthManageService } from '../../services/auth-manage.service';
import { ManageExerciseService } from'../../services/manage-exercise.service';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { RehabPlanManagerService } from '../../services/rehab-plan-manager.service';
import { AssessmentFormManagerService } from '../../services/assessment-form-manager.service';
import { PatientFunctionsManageService } from '../../services/patient-functions-manage.service';
import { RehabPlan } from '../../models/rehab-plan';
import { NgForm } from '@angular/forms';

import { Chart } from 'chart.js';

export class FileHolder {
  public serverResponse: any;
  public pending: boolean = false;
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  allowed = true;
  isPrinting=false;
  chosenPlans;
  myPlans;
  assessmentTests;
  availablePlans; 
  documents;
  transactions;
  messages; // leave thsi for later, will need to display order and whether it is admin or users
  email;
  denied;
  name;
  notes = [];
  photos=[];
  finishedResults;
  files=[];
  token;
  isAdmin;
  isPhys;
  receipts;
  isReset = false;
  cases;
  newMessage;
  emptyExercise = true;
  poster;
  
  photo1;
  photo2;
  isAllowed = false;
  selectedPlan: RehabPlan;
  printTabs=[];
  
  healthRatings;
  canvas: any;
  ctx: any;

  constructor(private router: Router , private route: ActivatedRoute, 
    private authServ: AuthManageService, private physicianTools: PhysicianManageProfileService,
    private rehabManage: RehabPlanManagerService, private assessmentManage: AssessmentFormManagerService, 
     private exerciseFetch: ManageExerciseService, private patientTools: PatientFunctionsManageService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }
    this.email = this.route.snapshot.params.email;
    this.physicianTools.checker(this.email).then( (resp) => {
      const parsedResp = JSON.parse(resp._body);
      console.log("AHHHHHHHHHHHHHHHHHHHH");
      console.log(parsedResp);
      if (!parsedResp.type){
        this.router.navigateByUrl('');
      }
    });
    
     this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.email = this.route.snapshot.params.email;
      this.isAdmin = validateRaw.data;
      this.isPhys = validateRaw.data3; 
      // if they are a physician or admin, they should only get the rehabplan list then
      if(this.isAdmin || this.isPhys){ 
        this.rehabManage.getPlans().then( (response) => { 
          const parsedResp = JSON.parse(response._body);
          if(parsedResp.type){// successful get 
            this.availablePlans = parsedResp.plansRecieved;
            this.isAllowed = true; 
          } else{ // log error                
            alert(parsedResp.response);
          }  
        });
      }
      else { // means they r nutt admin 
        this.authServ.confirmUser().then( (resp) => { 
          const parseEmail= JSON.parse(resp._body); 
          console.log(parseEmail.data); 
          if (this.email != parseEmail.data){
            this.router.navigateByUrl('');
          }
          else{
            this.allowed = true;
            this.authServ.isReset().then( (resp) => {
              const isResetData = JSON.parse(resp._body).data;
              if(isResetData == true){
                this.isReset = true;
              }
              else{
                this.isReset = false;
              }
            })
          }
        })
      } 
     });
        // this gets all the patients info, physician, admin and this patient sees this stuff
    this.email = this.route.snapshot.params.email;
    this.allowed = true; 
    this.physicianTools.retrieveProfile(this.email).then( (resp) =>{
      const parseProfile = JSON.parse(resp._body).data; 
      this.chosenPlans = parseProfile.plan;
      this.notes = parseProfile.notes;
      console.log(this.notes);
      this.photos = parseProfile.photos;
      this.transactions = parseProfile.payment;
      this.documents = parseProfile.documents;
      this.messages = parseProfile.messages; 
      let plansToGrab = parseProfile.plan;
      this.finishedResults = parseProfile.completedTests; 
      this.files= parseProfile.photos;
      this.healthRatings = parseProfile.healthRatings;
      this.receipts = parseProfile.receipts;
      this.myPlans=[]; 
      console.log(parseProfile);
      console.log('here bud');
      console.log(this.healthRatings);
      
      // grabbing the tests to do using the plans associated to it, later on we can package these up with the original
      // plan if needed, to provide better structure (ie: allow sections for each plan, with the tests for them listed underneath)
      for( let plan of plansToGrab){ 
        this.rehabManage.getSinglePlanWithId(plan).then( (recBack) => { 
          if(JSON.parse(recBack._body).data == null) {
            // means plans been deleted, so remove it
            this.physicianTools.removePlan(plan, this.email).then( (removeResp) => {  
            });
          } else {
            let planHolder =(JSON.parse(recBack._body).data);
            let testsToGrab = JSON.parse(recBack._body).data.tests; 
            // grabbing al plans and putting it into obj to show 
            planHolder.tests = [];
            if(testsToGrab != null && testsToGrab.length > 0){
              // flag: nullcheck on array
              for(let test of testsToGrab){ 
                if(test == null) continue; 
                this.assessmentManage.getSingleFormWithId(test).then( (jsonForm) => {
                  let parseForm = JSON.parse(jsonForm._body).data;
                  // flag: nullcheck on indiv. test response
                  if(parseForm == null) return; 
                  planHolder.tests.push(parseForm);
                })
              } 
            }
            // grabbing all exercises for test
            let exercToGrab = JSON.parse(recBack._body).data.exercises;
            planHolder.exercises = [];
            for(let exercise of exercToGrab){
              if(exercise == null) continue;
              this.exerciseFetch.getSingleExercise(exercise,  (qBack) => {
                // workaround : jsut skipping if it no longer exists
                if(qBack != null){ 
                  planHolder.exercises.push(qBack.exercise);
                }
              });  
            } 
            this.myPlans.push(planHolder);
          }
        });
      } 
       
    // // testing chart
    // this.canvas = document.getElementById('myChart');
    // this.ctx = this.canvas.getContext('2d');
    // let dates = [];
    // let ratings =[];
    // console.log('reached');
    // console.log(this.healthRatings);
    // for(let entry of this.healthRatings){
    //   console.log(entry);
    //   let myDate = new Date( entry.time);  
    //   let date = myDate.getFullYear()+'/'+(myDate.getMonth()+1)+'/'+myDate.getDate();
    //   console.log(date);
    //   dates.push(date);
    //   ratings.push(entry.rating);
    // }   
    // let myChart = new Chart(this.ctx, {
    //   type: 'line',
    //   data: {
    //       labels: dates,
    //       datasets: [{  
    //             data: ratings,
    //             label: "Health Improvement over Time",
    //             borderColor: "#3e95cd",
    //             fill: false 
    //       }]
    //   },
    //   options: {
    //     responsive: false,
    //     display:true
    //   }
    // });
    
    });   
     
  }
  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    // console.log('index => ', event.index);
    //console.log('tab => ', event.tab.textLabel);
    if(event.tab.textLabel =="Menus"){
      console.log("IN MENU")
      //ADD THE CODE HERE FROM THE GET TO POPULATE THE ACCORDIANS
      
    }
    if(event.tab.textLabel == "Progress Report"){
      //Render new canvas
      console.log("In Docs, Render the canvas now!")
          // testing chart
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let dates = [];
    let ratings =[];
    console.log('reached');
    console.log(this.healthRatings);
    for(let entry of this.healthRatings){
      console.log(entry);
      let myDate = new Date( entry.time);  
      let date = myDate.getFullYear()+'/'+(myDate.getMonth()+1)+'/'+myDate.getDate();
      console.log(date);
      dates.push(date);
      ratings.push(entry.rating);
    }   
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{  
                data: ratings,
                label: "Health Improvement over Time",
                borderColor: "#3e95cd",
                fill: false 
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
      
    }
    
  }
  
  saveFiles(){
    this.physicianTools.postPictures(this.files, this.email).then((addedResp) =>{ 
    });
  }
  onUploadFinished(file: FileHolder) { 
    this.files.push(file.src);
    this.saveFiles() 
  }
  onRemoved(i) {  
    this.files.splice(i, 1); 
    this.saveFiles() 
  }

  startAssess(){
    this.router.navigateByUrl('/write-test/5a9e08295471c98e7084791b');
  }
  
  
  takeTest(testToTake){
    const testPath = '/write-test/'+testToTake._id;
    this.router.navigateByUrl(testPath);
  }
  
  //$('#')
  customStyle = {
    selectButton: {
      //style here
    },
    clearButton: {
      "display":"none",
    },
    layout: {
      //style here
    },
    previewPanel: {
      "display":"none",
      //style here
    }
  }

  assignPlan(plan){ 
    //plan argument contains the selected plan's ID
    if(plan==undefined){ 
    }
    else{
      this.physicianTools.assignPlan(plan, this.email).then((addedResp) =>{
        const parsedOut = JSON.parse(addedResp._body); 
        //fetching the new tests assigned for the user
        this.rehabManage.getSinglePlanWithId(plan).then( (recBackTests) => {
          let planHolder =(JSON.parse(recBackTests._body).data);
          let testsToGrab = JSON.parse(recBackTests._body).data.tests; 
          // grabbing al plans and putting it into obj to show 
          planHolder.tests = [];
          for(let test of testsToGrab){
            this.assessmentManage.getSingleFormWithId(test).then( (jsonForm) => {
              let parseForm = JSON.parse(jsonForm._body).data; 
              planHolder.tests.push(parseForm);
            })
          }  
          this.myPlans.push(planHolder);
        });
      });
    }
  }
   


  removePlan(planId){
    this.physicianTools.removePlan(planId, this.email).then( (removeResp) => { 
    }); 
  } 
  
  deleteAcc(){
    this.physicianTools.deleteAcc(this.email).then( (resp) => {
          alert("Deleted this account");
          this.router.navigateByUrl('patient-profile');
    });
  }

  printPage(){
    window.print();
  }
  
    tabList = ["My Account","Appointments", "Accounting", "Messages", "Menus", "My Test Results"];
  showAccount=false;
  showAppointments = false;
  showAccounting = false;
  showMessages = false;
  showMenus = false;
  showResults = false; 
  selectedValue;
  
  addToList(){
    console.log(this.selectedValue);
    if(this.printTabs.includes(this.selectedValue)){
      //do nothing
    }else{
      this.printTabs.push(this.selectedValue);
      if(this.printTabs.includes("My Account")){
        this.showAccount = true;
      }
      if(this.printTabs.includes("Appointments")){
        this.showAppointments = true;
      }
      if(this.printTabs.includes("Accounting")){
        this.showAccounting = true;
      }
      if(this.printTabs.includes("Messages")){
        this.showMessages = true;
      }
      if(this.printTabs.includes("Menus")){
        this.showMenus = true;
      }
      if(this.printTabs.includes("My Test Results")){
        this.showResults = true;
      }
    }
  }
  resetList(){
    this.printTabs = [];
    this.showAccount=false;
    this.showAppointments = false;
    this.showAccounting = false;
    this.showMessages = false;
    this.showMenus = false;
    this.showResults = false; 
  }
}