import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { PatientFunctionsManageService } from '../../services/patient-functions-manage.service';

//for fetching info
import { QuestionMakerService } from '../../services/question-maker.service';
import { AssessmentFormManagerService } from'../../services/assessment-form-manager.service';
import { AuthManageService } from'../../services/auth-manage.service';
import { Question } from '../../models/question';
import { AssessForm } from '../../models/form'; 
import { CompletedTest } from '../../models/completed-test'; 
import { QuestionAnswerPair } from '../../models/question-answer-pair'; 

@Component({
  selector: 'app-write-test',
  templateUrl: './write-test.component.html',
  styleUrls: ['./write-test.component.css']
})
export class WriteTestComponent implements OnInit {

  testid; 
  selectedQuestions; 
  questionsToFetch;
  rating;
  email;
  completedTest: CompletedTest = new CompletedTest();
  assessmentform: AssessForm = new AssessForm();

  constructor(private questionMaker: QuestionMakerService, 
    private assesmentMaker: AssessmentFormManagerService,
    private router: Router , private route: ActivatedRoute, 
    private physicianTools: PhysicianManageProfileService, 
    private patientTools: PatientFunctionsManageService,
    private authServ: AuthManageService){ }


  ngOnInit() {
        this.testid =  this.route.snapshot.params.testid;
        this.completedTest.results =[];
        
        //fetching the test questions
        //console.log(this.testid);
        if(this.testid == undefined){ // means couldnt find id, so take em back
          alert("error finding form to edit"); 
        } else { 
          this.assesmentMaker.getSingleFormWithId(this.testid).then( (response) => {
            const parsedResp = JSON.parse(response._body);
            //console.log(parsedResp);
            if(parsedResp.type){// if successfully retrieved
            //console.log(parsedResp);
              this.selectedQuestions = []; // init blank array to put questions fetched into
              this.questionsToFetch = parsedResp.data.questions;
              this.assessmentform.name = parsedResp.data.name;
              this.assessmentform.description = parsedResp.data.description;
              for( let questionId of this.questionsToFetch ){
                this.questionMaker.getSingleQuestionWithId(questionId).then( (qBack) => {
                  let parsedqBack = JSON.parse(qBack._body); 
                  this.selectedQuestions.push(parsedqBack.data);
                });
              }
              //console.log('questions on test: ');
              //console.log(this.selectedQuestions);
            } else{ // log error
              const badError = "error fetching form from database, error: " + parsedResp.data;
              alert(badError);
            } 
          }); 
        } 
  }
  
  SubmitTest(){//submit a test
    for(let qAPair of this.selectedQuestions){
      let result = new QuestionAnswerPair();
      result.name = qAPair.name;
      result.helpDescription = qAPair.helpDescription;
      result.answer = qAPair.answer;
      result.questionText = qAPair.questionText; 
      this.completedTest.results.push(result);
    } 
    this.completedTest.name = this.assessmentform.name;
    this.completedTest.description = this.assessmentform.description; 
    this.completedTest.userToken = localStorage.getItem('token');
    this.patientTools.submitTest(this.completedTest).then( (resp) => {
      let parseBacc = JSON.parse(resp._body);
      //console.log(parseBacc);
    });
    // submitting the wellness resposnse for later visualizations
    //console.log('listing survey result');
    //console.log(this.rating);
    //console.log(Date.now());
    this.patientTools.rateHealth(this.rating, Date.now()).then( (rec) => { 
    });
    this.authServ.validate().then( (resp) => {
        const validateRaw = JSON.parse(resp._body); 
        this.email = validateRaw.data4;
        this.router.navigateByUrl('/view-profile/'+this.email);
    }); 
  }

}
