import { Component, AfterViewChecked, Input } from '@angular/core';
import { ReceiptService } from '../../services/receipt.service';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewChecked {
  
  public loading: boolean = true;
  
  private didRenderPaypal: boolean = false;
  
  @Input() paymentAmount: number;
  
  public paypalConfig: any = {
    env: 'sandbox', // Sandbox | Production
    // PayPal Client IDs 
    client: {
      sandbox: 'AZMwrfNc4ezjITbF_z9j2PLpgomKDmEsD57TpLt3-XVVbG3rPXN4WE9F0Rxvq-uKNeWyYbXip5YPC8FG',
      production: 'xxxxxxx'
    },
    // Show buyer a 'Pay Now' button in checkout flow
    commit: true,
    // Payment() is called on button clicked
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [{ amount: { total: this.paymentAmount, currency: 'CAD' }}]
        }
      });
    },
    // onAuthorize() is called when the buyer approves the payment
    onAuthorize: (data, actions) => {
      // make a call to REST api to execute payment
      return actions.payment.execute().then((payment) => {
        // payment JSON holds data about the transaction and buyer 
        if (payment.state == "approved") { 
          let _saleID = payment.id; 
          //console.log("payment approved. Transaction information will be saved to this account.");
          
          let myDate = new Date(  payment.create_time);  
          let date = myDate.getFullYear()+'/'+(myDate.getMonth()+1)+'/'+myDate.getDate();
          let _createTime = date;
          let _email = payment.payer.payer_info.email;
          let _fName = payment.payer.payer_info.first_name;
          let _lName = payment.payer.payer_info.last_name;
          let trs = payment.transactions; 
          let _amount = trs[0].amount.total;
          let _currency = trs[0].amount.currency;
          let tkn =  localStorage.getItem('token');
          let sender = {
            tokerino: tkn, 
            payload: {
              payId: _saleID,
              create_time: _createTime,
              email: _email,
              fNme: _fName,
              lName: _lName,
              amount: _amount,
              currency: _currency
            }
          };
          //console.log(sender);
          this.receiptService.saveToAccount(sender).then( (back) => { 
              alert("Payment Completed!");
              this.router.navigateByUrl('');
            });
        }
      });
    }
  }
  
  public ngAfterViewChecked(): void {
    if(!this.didRenderPaypal) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button-container');
        this.loading = false;
      });
    }
  }
  
  // Ensure refs are loaded properly and script can be used
  public loadPaypalScript(): Promise<any> {
    this.didRenderPaypal = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  constructor(private receiptService : ReceiptService, private router: Router) {
    
  }

}
