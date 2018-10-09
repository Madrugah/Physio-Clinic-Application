import { Component, OnInit } from '@angular/core';
import { QuestionMakerService } from '../../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../../services/assessment-form-manager.service';
import {Question} from '../../../models/question';
import {AssessForm} from '../../../models/form';
import { Router } from '@angular/router';
import { AuthManageService } from '../../../services/auth-manage.service';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.css']
})
export class FormSelectorComponent implements OnInit {
  isForEdit=true;//to tell the assessment list component to allow edit and delete links check html
  adminStatus = false;
  physStatus = false;
  constructor(private authServ: AuthManageService, private questionMaker: QuestionMakerService, private assesmentMaker: AssessmentFormManagerService, private router: Router) { }

  ngOnInit() {
    this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body);
      this.adminStatus = validateRaw.data;
      this.physStatus = validateRaw.data3;
      if( !validateRaw.data && !validateRaw.data3){ // means they r nutt admin
        this.router.navigateByUrl('');
      }
    });
  }

// deletes from backend
  checkForDelete(x){
    if(x.description){
      this.deletePlan(x._id);
    } else {
      this.editPlan(x._id);
    }
  }
//redirect to a new form
  newFormRedirect(): void {
    this.router.navigateByUrl('/assessment-form');
  }
  //delete a plan based on id
  deletePlan(formId): void {
    this.assesmentMaker.deleteForm(formId).then( (resp) => {
      const parsedOut = JSON.parse(resp._body);
      location.reload();
    });  
  } 
  //edit a plan selected by its id
  editPlan(formId): void {
    const editRedirect = "/edit-form/" +formId; 
    this.router.navigateByUrl(editRedirect);
  }

}
