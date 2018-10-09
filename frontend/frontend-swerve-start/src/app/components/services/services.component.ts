import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  Amount = 150.00;
  token;
  loggedIn = false;
  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token == undefined || this.token == "undefined" || this.token == null || this.token == "null"){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
    }
  }
  
  setAmount(n){
    this.Amount = n;
  }

}
