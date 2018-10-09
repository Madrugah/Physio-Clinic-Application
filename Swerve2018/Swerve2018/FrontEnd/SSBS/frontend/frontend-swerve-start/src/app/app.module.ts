// External Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FileDropModule } from 'ngx-file-drop';
import { ImageUploadModule } from "angular2-image-upload";
import {DxSchedulerModule, DevExtremeModule} from 'devextreme-angular';


// import angular router
import { RouterModule } from '@angular/router'; 

// Material imports
import { MaterialModule } from './material.module';
import { MatDialogModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material'; 



import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatSelectModule, MatSnackBarModule } from "@angular/material";

// Services
import { QuestionMakerService } from './services/question-maker.service';
import { ManageExerciseService } from './services/manage-exercise.service';  
import { PhysicianManageProfileService } from './services/physician-manage-profile.service';
import { AuthManageService } from './services/auth-manage.service';
import { AssessmentFormManagerService } from './services/assessment-form-manager.service';
import { RehabPlanManagerService } from './services/rehab-plan-manager.service';
import { SchedulerService } from './services/scheduler.service';
import { ReceiptService } from './services/receipt.service';

// Components
import { AppComponent } from './app.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';
import { QuestionFormComponent } from './components/assessmentparts/question-form/question-form.component';
import { AssesmentFormComponent } from './components/assessmentparts/assesment-form/assesment-form.component';
import { HomeComponent } from './components/home/home.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { FormSelectorComponent } from './components/assessmentparts/form-selector/form-selector.component';
import { EditFormComponent } from './components/assessmentparts/edit-form/edit-form.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';  
import { CreatePlanComponent } from './components/rehabparts/create-plan/create-plan.component';
import { EditPlanComponent } from './components/rehabparts/edit-plan/edit-plan.component';
import { PlanSelectComponent } from './components/rehabparts/plan-select/plan-select.component';
import { AboutComponent } from './components/about/about.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ServicesComponent } from './components/services/services.component';
import { MenuMakerComponent } from './components/exercise/menu-maker/menu-maker.component';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewPatientFormComponent } from './components/new-patient-form/new-patient-form.component';
import { NewPatientBookingComponent } from './components/new-patient-form/new-patient-booking/new-patient-booking.component';
import { IntroFormComponent } from './components/new-patient-form/intro-form/intro-form.component';
import { PatientImageComponent } from './components/new-patient-form/patient-image/patient-image.component';
import { ExerciseDialogComponent } from './components/exercise/exercise-dialog/exercise-dialog.component';
import { TestSchedulerComponent } from './components/test-scheduler/test-scheduler.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { SchedulerDialogComponent } from './components/test-scheduler/scheduler-dialog/scheduler-dialog.component';
import { WriteTestComponent } from './components/write-test/write-test.component';
import { ClientSchedulerComponent } from './components/client-scheduler/client-scheduler.component';
import { PatientFunctionsManageService } from './services/patient-functions-manage.service';
import { ExercisesListComponent } from './components/rehabparts/create-plan/exercises-list/exercises-list.component';
import { AssessmentListComponent } from './components/rehabparts/create-plan/assessment-list/assessment-list.component';
import { QuestionListComponent } from './components/assessmentparts/question-list/question-list.component';
import { QuestionSelectorComponent } from './components/assessmentparts/question-selector/question-selector.component';
import { TypeListComponent } from './components/assessmentparts/question-selector/type-list/type-list.component';
import { PendingListComponent } from './components/test-scheduler/pending-list/pending-list.component';
import { ConfirmedListComponent } from './components/test-scheduler/confirmed-list/confirmed-list.component';
import { CreateStepperComponent } from './components/create-stepper/create-stepper.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FreqComponent } from './components/freq/freq.component';
import { HomePictureComponent } from './components/home-picture/home-picture.component';
import { HomeEditAdminComponent } from './components/home-edit-admin/home-edit-admin.component';
import { MessagesComponent } from './components/profile-view/messages/messages.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { CreatePhysComponent } from './components/create-phys/create-phys.component';
import { MenusComponent } from './components/profile-view/menus/menus.component';
import { TestsComponent } from './components/profile-view/tests/tests.component';
import { NotesComponent } from './components/profile-view/notes/notes.component';
import { ClientAppointmentsComponent } from './components/client-scheduler/client-appointments/client-appointments.component';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';
import { PhysicianAccountListComponent } from './components/physician-account-list/physician-account-list.component';


@NgModule({
  declarations: [
    AppComponent, 
    PatientProfileComponent,
    CreateExerciseComponent,
    QuestionFormComponent,
    HomeComponent,
    AssesmentFormComponent,
    ExerciseComponent,
    FormSelectorComponent,
    EditFormComponent,
    CreateProfileComponent,
    ExerciseDialogComponent,
    CreatePlanComponent,
    EditPlanComponent,
    PlanSelectComponent,
    AboutComponent,
    HowItWorksComponent,
    ServicesComponent,
    MenuMakerComponent,
    AccountLoginComponent,
    AdminDashboardComponent,
    NewPatientFormComponent,
    NewPatientBookingComponent,
    IntroFormComponent,
    PatientImageComponent,
    TestSchedulerComponent,
    CreateAccountComponent,
    ProfileViewComponent,
    SchedulerDialogComponent,
    WriteTestComponent,
    ClientSchedulerComponent,
    ExercisesListComponent,
    AssessmentListComponent,
    QuestionListComponent,
    QuestionSelectorComponent,
    TypeListComponent,
    PendingListComponent,
    ConfirmedListComponent,
    CreateStepperComponent,
    PaymentComponent,
    FreqComponent,
    HomePictureComponent,
    HomeEditAdminComponent,
    MessagesComponent,
    CreateAdminComponent,
    CreatePhysComponent,
    MenusComponent,
    TestsComponent,
    NotesComponent,
    ClientAppointmentsComponent,
    AdminMessagesComponent,
    PhysicianAccountListComponent,
  ],
  imports: [
    DevExtremeModule,
    DxSchedulerModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTabsModule,
    BsDropdownModule.forRoot(),
    MatIconModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    FileDropModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      // { path: 'create-account', component: CreateAccountComponent },
      { path: 'create-account', component: CreateStepperComponent },
      { path: 'login', component: AccountLoginComponent },
      { path: 'exercise', component: ExerciseComponent },
      { path: 'messages', component: AdminMessagesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'how-it-works', component: HowItWorksComponent },
      { path: 'home-edit', component: HomeEditAdminComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'freq', component: FreqComponent },
      { path: 'patient-profile', component: PatientProfileComponent },
      { path: 'create-profile', component: CreateProfileComponent },
      { path: 'create-admin', component: CreateAdminComponent },
      { path: 'create-phys', component: CreatePhysComponent },
      { path: 'new-patient', component: NewPatientFormComponent },
      { path: 'assessment-select', component: FormSelectorComponent },
      { path: 'physician-list', component: PhysicianAccountListComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'assessment-form', component: AssesmentFormComponent },
      { path: 'edit-form/:id', component: EditFormComponent },
      { path: 'question-form', component: QuestionFormComponent },
      { path: 'question-form/:id', component: QuestionFormComponent },
      { path: 'question-selector', component: QuestionSelectorComponent },
      { path: 'menu', component: CreatePlanComponent },
      { path: 'admin-create-account', component: CreateAccountComponent },
      { path: 'menu-select', component: PlanSelectComponent },
      { path: 'edit-plan/:id', component: EditPlanComponent },
      { path: 'view-profile/:email', component: ProfileViewComponent },
      { path: 'write-test/:testid', component: WriteTestComponent },
      { path: 'client-appointment', component: ClientSchedulerComponent },
      { path: 'rehab-plan', redirectTo: 'menu', pathMatch: 'full'}, //default is home
      { path: 'rehab-plan-select', redirectTo: 'menu-select', pathMatch: 'full'}, //default is home
      { path: '', redirectTo: '', pathMatch: 'full'}, //default is home
      { path: '**', redirectTo: '', pathMatch: 'full'} //any that arent defined redirect home
    ])
  ],
  providers: [
    QuestionMakerService, 
    ManageExerciseService, 
    AssessmentFormManagerService, 
    PhysicianManageProfileService, 
    RehabPlanManagerService, 
    AuthManageService, 
    SchedulerService, 
    PatientFunctionsManageService,
    ReceiptService
  ],
  entryComponents: [ExerciseDialogComponent, SchedulerDialogComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
