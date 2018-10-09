import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'; 
import {environment} from '../../environments/environment'; 

@Injectable()
export class ReceiptService {

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http : Http) { }
  
  // save the provided receipt to the purchasing account
  saveToAccount(receipt) : Promise<any> {//save receipt to account
    const url = `${environment.BASE_URL}/patientProfile/AddReceipt`;
    //console.log(url);
    const heads: Headers = new Headers({
      'Content-Type': 'application/json'
    }); 
    //console.log(receipt);
    return this.http.post(url, receipt, {headers: heads}).toPromise();
  }

}
