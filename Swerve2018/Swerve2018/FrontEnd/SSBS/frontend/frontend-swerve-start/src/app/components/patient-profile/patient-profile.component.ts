import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PhysicianManageProfileService } from '../../services/physician-manage-profile.service';
import { AuthManageService } from '../../services/auth-manage.service'
import { Profile } from '../../models/profile';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
public showThis;
x;
valueOfArray;
DOB;
email;
givenName;
familyName;
postalCode;
phone;
maritalStatus;
healthCardNo;
occupation;
country;
province;
city;
selectedEmail;
listOfFirstNames;
listOfLastNames;
listOfEmails;
listOfProfiles:Profile[]=[];
listIsPaid;
currentProfiles: Profile[]=[];
listOfDates = [];
isAllowed = false;
isAdmin = false;
isPhys = false;
token;
//list all the columns from the table
ColChoose = new FormControl();
ColList = [
    'Last Name',
    'First Name',
    'Email'
    ];

/// mat table stuff also look at onInitResponse()
  Loading=false;
//set up data for the table
displayedColumns = ['button', 'familyName', 'givenName','birthDate', 'email'];
dataSource = new MatTableDataSource<Profile>(ELEMENT_DATA);
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private profileService: PhysicianManageProfileService, private router: Router, private authServ: AuthManageService) {
    this.showThis=false;
    this.lastIsClicked = false;
    this.prevLetter = " ";
    this.prevLetter2 = " ";
    this.firstLetterID = "A";
  }
//get token on init
  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.router.navigateByUrl('');
    }

    
     this.authServ.validate().then( (resp) => {
      const validateRaw = JSON.parse(resp._body); 
      this.isAdmin = validateRaw.data;
      this.isPhys = validateRaw.data3; 
      // if they are a physician or admin
      if(this.isAdmin || this.isPhys){ 
            this.isAllowed = true; 
          } else{              
            this.router.navigateByUrl('');
          }  
        });//get the profiles
    this.profileService.getProfiles().then((same) =>{
            //console.log((same._body));
    this.x = JSON.parse(same._body).data;
    for (var i = 0; i<this.x.length; i++){
    
       if (this.x[i] == null || this.x[i] == "null"){
        this.x.splice(i,1);
          }
        }
      });//organize the profiles into lists
      this.profileService.getInfo().then((stuff) =>{
            this.listOfFirstNames = JSON.parse(stuff._body).firstList;
            this.listOfLastNames = JSON.parse(stuff._body).lastList;
            this.listOfEmails = JSON.parse(stuff._body).emailList;
            this.listOfProfiles = JSON.parse(stuff._body).profileList;
            this.listIsPaid = JSON.parse(stuff._body).isPaidList;
            
            for(var i =0; i< this.listOfProfiles.length; i++){
           this.currentProfiles.push(this.listOfProfiles[i]);
          //push all of the profiles into the current profiles list
           }
            var DOB3;
            for(var i=0;i<this.listOfProfiles.length;i++){
              DOB3 = new Date(this.listOfProfiles[i].DOB);
              this.listOfDates.push(DOB3.toISOString().split('T')[0]);
              this.listOfProfiles[i].DOB = this.listOfDates[i];
            }
            //console.log(this.listOfProfiles);
            //populate table with list of profiles
            this.dataSource = new MatTableDataSource<Profile>(this.listOfProfiles);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        
      });//have current profiles contain the current profiles in the table
      for(var i =0; i< this.listOfProfiles.length; i++){
        //console.log("hellow");
      this.currentProfiles.push(this.listOfProfiles[i]);
      //console.log(this.currentProfiles[i]);
    }
      
  }
  
  editProfileNav(email){//link to the patient profile on clicking on it in the table
    //console.log(email);
    const url = '/view-profile/' + email;
    this.router.navigateByUrl(url);
  }
  
  letterArray: Profile[]=[];
  removedArray: Profile[]=[];
  removedArray2: Profile[]=[];
  returnedArray: Profile[] = [];
  refilter;
  lastIsClicked;
  prevLetter;
  prevLetter2;
  
  onFilter(letter){//filter the table based on a letter selected
    if(this.refilter==1){//may need to refilter if other filter is applied
      this.refilter=0;
      var lC = letter.toLowerCase();
      var uC = letter.toUpperCase();
      this.letterArray = [];
      
      for(var i = 0; i< this.currentProfiles.length; i++){
      if((this.currentProfiles[i].familyName.startsWith(lC) || this.currentProfiles[i].familyName.startsWith(uC))){
        this.letterArray.push(this.currentProfiles[i]);
      }
      else{
        this.removedArray.push(this.currentProfiles[i]);
      }
    }
    this.currentProfiles=[];
    for(var i = 0; i<this.letterArray.length;i++){
      this.currentProfiles.push(this.letterArray[i]);
    }
    this.removedArray2=[];
    this.dataSource = new MatTableDataSource<Profile>(this.currentProfiles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    } 
    
    else{
      this.lastIsClicked = true;
    if(this.prevLetter == letter){
      this.prevLetter = " ";
      if(this.lastIsClicked){
        this.lastIsClicked = false; 
      }//toggle lastIsClicked
      //if toggling off filter, push back into current list
      for(var i = 0; i< this.removedArray.length;i++){
        this.currentProfiles.push(this.removedArray[i]);
      }
      if(this.prevLetter2!=" "){//if previous letter was empty, refilter other letter
      this.refilter = 1;
      this.onFilterFirst(this.prevLetter2);
      }
      this.removedArray = [];
      //refresh table
      this.dataSource = new MatTableDataSource<Profile>(this.currentProfiles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else{
        for(var i = 0; i<this.removedArray.length;i++){
          this.currentProfiles.push(this.removedArray[i]);
        }//readd the removed profiles
        this.removedArray=[];
        
        if(this.prevLetter2!=" "){
      this.refilter = 1;
      this.onFilterFirst(this.prevLetter2);
      }
      
    this.lastIsClicked = true;  
    this.letterArray = [];
    this.prevLetter=letter;
    var lowerCase = letter.toLowerCase();
    var upperCase = letter.toUpperCase();
    
    for(var i = 0; i< this.currentProfiles.length; i++){//filter the current profile list
      if((this.currentProfiles[i].familyName.startsWith(lowerCase) || this.currentProfiles[i].familyName.startsWith(upperCase))){
        this.letterArray.push(this.currentProfiles[i]);
      }
      else{
        this.removedArray.push(this.currentProfiles[i]);
      }//add the removed profiles to the removed array
    }//refresh table
    this.dataSource = new MatTableDataSource<Profile>(this.letterArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.currentProfiles = [];
    for(var i = 0; i<this.letterArray.length;i++){
      this.currentProfiles.push(this.letterArray[i]);
    }
    }
  
  }
  }
  firstIsClicked;
  firstLetterID;
  onFilterFirst(letter){//filter the list based on first letter of first name
    if(this.refilter==1){
      this.refilter=0;
      var lC2 = letter.toLowerCase();
    var uC2 = letter.toUpperCase();
     this.letterArray = [];
      for(var i = 0; i< this.currentProfiles.length; i++){//filter the current list based on the letter
      if((this.currentProfiles[i].givenName.startsWith(lC2) || this.currentProfiles[i].givenName.startsWith(uC2))){
        this.letterArray.push(this.currentProfiles[i]);
      }
      else{
        this.removedArray2.push(this.currentProfiles[i]);
      }
    }
    this.currentProfiles = [];
    for(var i = 0; i<this.letterArray.length;i++){
      this.currentProfiles.push(this.letterArray[i]);
    }
    
    this.removedArray=[];
    //refresh table
    this.dataSource = new MatTableDataSource<Profile>(this.letterArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
      
    }
    else{
      this.firstIsClicked = true;
    if(this.prevLetter2 == letter){
      //console.log("deactivate givenFilter");
      
      
      this.prevLetter2 = " ";
      if(this.firstIsClicked){
        this.firstIsClicked = false;
        //console.log(this.firstLetterID + letter);
      var x = document.getElementById(this.firstLetterID + letter); 
      }

      for(var i = 0; i< this.removedArray2.length;i++){
        this.currentProfiles.push(this.removedArray2[i]);
      } //add all removed profiles back and refresh table
      this.removedArray2 = [];
      this.dataSource = new MatTableDataSource<Profile>(this.currentProfiles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else{
      for(var i = 0; i<this.removedArray2.length;i++){
          this.currentProfiles.push(this.removedArray2[i]);
        }
        this.removedArray2 = [];
        //empty every that was removed by first back into array and refilter
        if(this.prevLetter!=" "){
      this.refilter = 1;
      this.onFilter(this.prevLetter);
      }
        
    
    this.letterArray = [];
    this.prevLetter2=letter;
    var lowerCase = letter.toLowerCase();
    var upperCase = letter.toUpperCase();
    
    for(var i = 0; i< this.currentProfiles.length; i++){//filter profiles from
      if(this.currentProfiles[i].givenName.startsWith(lowerCase) || this.currentProfiles[i].givenName.startsWith(upperCase)){
        this.letterArray.push(this.currentProfiles[i]);
      }
      else{
        this.removedArray2.push(this.currentProfiles[i]);
      }
    }
    //refresh table
    this.dataSource = new MatTableDataSource<Profile>(this.letterArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.currentProfiles = [];
            
            //push into current profiles
    for(var i = 0; i<this.letterArray.length;i++){
      this.currentProfiles.push(this.letterArray[i]);
    }
    }
    }
  }
  joinedArray: Profile[]=[];
   
  onSearch(form:any){//search the table
    this.Loading=true;
    if (this.ColChoose.value!=null){
//      //console.log(this.ColChoose.value);
      this.search(form.value.Search, this.ColChoose.value)
    }else{
      //console.log(this.ColList);      
      this.search(form.value.Search, this.ColList)
    }
    //console.log(this.exercises);
  }
  
newArray: Profile[]=[];
  search(term, columns){//refresh table based on the terms and columns selected
    this.newArray=[];
    //console.log(term);
    //console.log(columns);
    for(let i=0; i<this.listOfProfiles.length;i++){
      //console.log(i);
      for(let j=0; j<columns.length;j++){
        //console.log(j);
        switch(columns[j]) {
          case "Last Name":
            if(this.listOfProfiles[i].familyName.toLowerCase().includes(term.toLowerCase())){
              //console.log(this.listOfProfiles[i].familyName);
              j=10;
              this.newArray.push(this.listOfProfiles[i]);
            }
            break;
          case "First Name":
            //console.log(this.exercises[i].description);
            if(this.listOfProfiles[i].givenName.toLowerCase().includes(term.toLowerCase())){
             // //console.log(this.exercises[i].description.toLowerCase());
              j=10;
              this.newArray.push(this.listOfProfiles[i]);
            }
            break;
          case "Email":
            if(this.listOfProfiles[i].email == undefined){
            
            }else if(this.listOfProfiles[i].email.includes(term)){
              j=10;
              this.newArray.push(this.listOfProfiles[i]);
            }
            
            break;
        }//*/
      }
    }
    //console.log(this.newArray);
    //refresh table
    this.dataSource = new MatTableDataSource<Profile>(this.newArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Loading=false;
  }
  
  onButtonPress(){ 
    //console.log(this.valueOfArray);
    this.showThis=true;//on button press get the information of the profile
    if (this.valueOfArray != undefined && this.valueOfArray != "undefined"){
    this.profileService.retrieveProfile(this.valueOfArray)
      .then((respond) => {
        
        let boi = JSON.parse(respond._body).data;
        //console.log(boi);
        this.email = boi.email;
        var DOB2 = new Date(boi.DOB);
        this.DOB = DOB2.toISOString().split('T')[0];
        this.selectedEmail = boi.email;
        this.givenName = boi.givenName;
        this.familyName = boi.familyName;
        this.postalCode = boi.postalCode;
        this.phone = boi.phone;
        this.maritalStatus = boi.maritalStatus;
        this.healthCardNo = boi.healthCardNo;
        this.occupation = boi.occupation;
        this.country = boi.country;
        this.province = boi.province;
        this.city = boi.city;
      })
    }
  }
  
    onSubmit(form: NgForm): void {
      const frm = form.value;
      //console.log(frm);
      //ensure data is valid and then submit
      if (frm.email == undefined || frm.email == "undefined"){
            alert("Please fill in an email address");
      }
      else if (frm.email.length != 0 && !this.ValidateEmail(frm.email)){
            alert("Invalid Email");
      }
      else if (frm.givenName== undefined || frm.givenName == "undefined") {
            alert("Please fill in a name")
      }
      else if (frm.familyName== undefined || frm.familyName == "undefined") {
            alert("Please fill in a family name")
      }
      else if (frm.familyName == undefined || frm.familyName == "undefined") {
            alert("Please fill in a family name")
      }
      else if(frm.DOB == undefined || frm.DOB == "undefined") {
            alert("Please fill in a Date of Birth")
      }
      else if(frm.postalCode== undefined || frm.postalCode == "undefined") {
            alert("Please fill in a postal Code ")
      }
      else if(frm.phone== undefined || frm.phone == "undefined") {
            alert("Please fill in a phone number ")
      }
      else if(frm.maritalStatus== undefined || frm.maritalStatus == "undefined") {
            alert("Please fill in a marital status ")
      }
      else if(frm.healthCardNo == undefined || frm.healthCardNo == "undefined") {
            alert("Please fill in a health card number ")
      }
      else if(frm.occupation == undefined || frm.occupation == "undefined") {
            alert("Please fill in an occupation ")
      }
      else if(frm.country == undefined || frm.country == "undefined") {
            alert("Please fill in a country ")
      }
      else if(frm.province == undefined || frm.province == "undefined") {
            alert("Please fill in a province ")
      }
      else if(frm.city == undefined || frm.city == "undefined") {
            alert("Please fill in a city ")
      }
      else{
      this.profileService.editProfile(frm, this.selectedEmail)
      .then((respond) => {
        alert(respond.json().data);
        location.reload();
      })
      .catch((err) => {
        //console.log(err);
      });
    }
  }


ValidateEmail(mail): Boolean   //Validates the email with proper characters
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }  
    return (false)  
  }  
}
const ELEMENT_DATA: Profile[] = [];