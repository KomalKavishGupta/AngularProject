import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerCreditService } from 'src/app/services/customer-credit.service';
import { ExecutionTimeCalculationService } from 'src/app/services/execution-time-calculation.service';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {
  closeResult: string = "";
  selectCustomerId: number;
  creditmodal: any;
  submitted: boolean = false;
   customerDetails: Array<any> = [];


   constructor(private custService: CustomerCreditService, private _executionTimeService: ExecutionTimeCalculationService){
    this.submitted = false;
   }

   ngOnInit(){
    this.submitted = false;
    this.getCustomerList();
    this._executionTimeService.setValue(0, 0);
   }

   getCustomerList(){
    const ownerId = localStorage.getItem("ownerId");
      this.custService.getCustomers(ownerId).subscribe(data=>{
        this.customerDetails = data;
      }
        );    
  }

   onSubmit(form: NgForm){
    const startTime = performance.now();

    const custCreditDetails = {
      customerId: form.control.value.customerName,
      customerHash: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
      amount: form.control.value.amount,
      description: form.control.value.description.toString(),
      paidStatus: false,
    }

    this.selectCustomerId = custCreditDetails.customerId;
   
    this.custService.addCreditDetails(this.selectCustomerId, custCreditDetails, false).subscribe(data=>{
      console.log(data);
      this.submitted = true;
      form.reset();
      // this.getCustomerList();
    });

    const endTime = performance.now();
    this._executionTimeService.setValue(startTime, endTime);

  }

}
