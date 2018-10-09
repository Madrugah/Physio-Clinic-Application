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
import { MatTabChangeEvent } from '@angular/material';

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
  messages; 
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
  showMessages;
  isReset = false;
  isPaid = true;
  cases;
  newMessage;
  emptyExercise = true;
  poster;
  displayMenu;
  displayTest;
  displayMessages;
  
  photo1;
  photo2;
  isAllowed = false;
  selectedPlan: RehabPlan;
  printTabs=[];
  event;
  healthRatings;
  canvas: any;
  ctx: any;

  constructor(private router: Router , private route: ActivatedRoute, 
    private authServ: AuthManageService, private physicianTools: PhysicianManageProfileService,
    private rehabManage: RehabPlanManagerService, private assessmentManage: AssessmentFormManagerService, 
    private exerciseFetch: ManageExerciseService, private patientTools: PatientFunctionsManageService) { }

  ngOnInit() {
    //get the token of the user
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }//if user has no token, reroute them to the home page
    //get the email
    this.email = this.route.snapshot.params.email;
    //check the type of account that the email has
    this.physicianTools.checker(this.email).then( (resp) => {
      const parsedResp = JSON.parse(resp._body); 
      if (!parsedResp.type){
        this.router.navigateByUrl('');
      }
    });
    //validate that the current user is an admin or a physician
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
      else { // confirm that the user is registered
        this.authServ.confirmUser().then( (resp) => { 
          const parseEmail= JSON.parse(resp._body);  
          if (this.email != parseEmail.data){
            this.router.navigateByUrl('');
          }
          else{
            this.allowed = true;
            this.authServ.isReset().then( (resp) => {
              const isResetData = JSON.parse(resp._body).data;
              const isPaidRec = JSON.parse(resp._body).data2;
              if(isResetData == true && isPaidRec == true){
                this.isReset = true;
                this.isPaid = true;
              }
              else if(isResetData == false && isPaidRec == true){
                this.isReset = false;
                this.isPaid = true;
              }
              else if (isResetData == true && isPaidRec == false ){
                this.isReset = true;
                this.isPaid = false;
              }
              else {
                this.isReset = false;
                this.isPaid = false;
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
      //console.log(parseProfile);
      //console.log('here bud');
      //console.log(this.healthRatings);
      
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
        
    
    });   
    //console.log('got plans');
    //console.log(this.myPlans); 
    this.displayMenu = false;
    this.displayTest = false;
    this.displayMessages = false;
  }
  onLinkClick(event: MatTabChangeEvent) { 
    if(event.tab.textLabel =="Menus"){ 
      
      this.displayMenu = true;

    }else if(event.tab.textLabel =="My Test Results"){ 
      this.displayTest = true;
      
    }else if(event.tab.textLabel =="Messages"){ 
      this.displayMessages = true;
    }
    
    else if(event.tab.textLabel == "Progress Report"){
      //Render new canvas 
          // testing chart
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let dates = [];
    let ratings =[]; 
    for(let entry of this.healthRatings){ 
      let myDate = new Date( entry.time);  
      let date = myDate.getFullYear()+'/'+(myDate.getMonth()+1)+'/'+myDate.getDate(); 
      dates.push(date);
      ratings.push(entry.rating);
    }   
    //displaying data chart for patient
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
  //saves pictures to a patient's account
  saveFiles(){
    this.physicianTools.postPictures(this.files, this.email).then((addedResp) =>{ 
    });
  }
  //once a file is uploaded push it to the saved files
  onUploadFinished(file: FileHolder) { 
    this.files.push(file.src);
    this.saveFiles() 
  }
  //remove a specific file
  onRemoved(i) {  
    this.files.splice(i, 1); 
    this.saveFiles() 
  }
  //starts a specific assessment
  startAssess(){
    this.router.navigateByUrl('/write-test/5a9e08295471c98e7084791b');
  }
  
  //pics a test to take based on id
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
//assigns a plan to a patient
  // assignPlan(plan){ 
  //   //plan argument contains the selected plan's ID
  //   if(plan==undefined){ 
  //   }
  //   else{
  //     this.physicianTools.assignPlan(plan, this.email).then((addedResp) =>{
  //       const parsedOut = JSON.parse(addedResp._body); 
  //       //fetching the new tests assigned for the user
  //       this.rehabManage.getSinglePlanWithId(plan).then( (recBackTests) => {
  //         let planHolder =(JSON.parse(recBackTests._body).data);
  //         let testsToGrab = JSON.parse(recBackTests._body).data.tests; 
  //         // grabbing all plans and putting it into obj to show 
  //         planHolder.tests = [];
  //         for(let test of testsToGrab){
  //           this.assessmentManage.getSingleFormWithId(test).then( (jsonForm) => {
  //             let parseForm = JSON.parse(jsonForm._body).data; 
  //             planHolder.tests.push(parseForm);
  //           })
  //         }  
  //         this.myPlans.push(planHolder);
  //       });
  //     });
  //   }
  // }
   

//remove plan based on id from a patient
  removePlan(planId){
    this.physicianTools.removePlan(planId, this.email).then( (removeResp) => { 
    }); 
  } 
  //delete this patient's account
  deleteAcc(){
    var con = confirm("Are you certain you want to delete this account?");
    if(con){
    this.physicianTools.deleteAcc(this.email).then( (resp) => {
          alert("Deleted this account");
          this.router.navigateByUrl('patient-profile');
    });
    }
  }

    tabList = ["My Account","Appointments", "Accounting", "Menus", "My Test Results"];
  showAccount=false;
  showAppointments = false;
  showAccounting = false;
  
  showMenus = false;
  showResults = false; 
  selectedValue;
  //building a list for each menu to add to the print menu
  addToList(){ 
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
      if(this.printTabs.includes("Menus")){
        this.showMenus = true;
      }
      if(this.printTabs.includes("My Test Results")){
        this.showResults = true;
      }
    }
  }
  //resets the print menu
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
