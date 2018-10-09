import { Component, OnInit, Input } from '@angular/core';
import { PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { RehabPlanManagerService } from '../../../services/rehab-plan-manager.service';
import { AssessmentFormManagerService } from '../../../services/assessment-form-manager.service';
import { RehabPlan } from '../../../models/rehab-plan';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  @Input() isAllowed : any;
  @Input() myPlans : any;
  myShownPlans
  @Input() availablePlans : any;
  @Input() showMenus;
  selectedPlan: RehabPlan;
  email; 
  //myPlans;
  constructor(private physicianTools: PhysicianManageProfileService,
              private route: ActivatedRoute, private router: Router,
              private rehabManage: RehabPlanManagerService, 
              private assessmentManage: AssessmentFormManagerService
              ) { 
    this.email=this.route.snapshot.params.email
    //get the email of the patient
  }

  ngOnInit() { 
  }
  ngOnChanges(...args: any[]) { 
    console.log(this.myPlans)
    this.myShownPlans = this.myPlans;
  }  
  
  removeMenu(plan, i){
    //remove a plan from the patient by the plan's id
    this.physicianTools.removePlan(plan._id, this.email).then( (removeResp:any) => { 
      const parsedOut = JSON.parse(removeResp._body); 
      alert(parsedOut.data);
      if(parsedOut.type)
      {
        this.myShownPlans.splice(i,1);
      }  
    });
      
  } 
  takeTest(testToTake){//routes patient to the test they have to take
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
          // grabbing all plans and putting it into obj to show 
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
