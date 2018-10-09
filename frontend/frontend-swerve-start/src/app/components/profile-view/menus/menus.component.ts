import { Component, OnInit, Input } from '@angular/core';
import { PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { RehabPlanManagerService } from '../../../services/rehab-plan-manager.service';
import { AssessmentFormManagerService } from '../../../services/assessment-form-manager.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  email
  @Input() myPlans: any;
  //myPlans;
  constructor(private physicianTools: PhysicianManageProfileService,
              private route: ActivatedRoute, private router: Router,
              private rehabManage: RehabPlanManagerService, 
              private assessmentManage: AssessmentFormManagerService) { 
    this.email=this.route.snapshot.params.email
  }

  ngOnInit() {
  }
  ngOnChanges(...args: any[]) {
      // this.myPlans=this.myPlans2;
      //ready to use plans to grab
  } //this. 
  
  removePlan(planId){
    this.physicianTools.removePlan(planId, this.email).then( (removeResp) => { 
    }); 
  } 
  takeTest(testToTake){
    const testPath = '/write-test/'+testToTake._id;
    this.router.navigateByUrl(testPath);
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

}
