import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerCountService } from 'src/app/services/customer-count.service';
import { CustomerCreditService } from 'src/app/services/customer-credit.service';
import { ExecutionTimeCalculationService } from 'src/app/services/execution-time-calculation.service';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.component.html',
  styleUrls: ['./deposit-amount.component.css']
})
export class DepositAmountComponent implements OnInit{

  @Output() advancePayCount: EventEmitter<any> = new EventEmitter(); 
  //regForm: FormGroup;
  customersCount: any[] = [0,0];

  closeResult: string = "";
  selectCustomerId: number;
  creditmodal: any;
  submitted: boolean = false;
   customerDetails: Array<any> = [];


   constructor(private custService: CustomerCreditService, private _customerCount: CustomerCountService,
    private _executionTimeService: ExecutionTimeCalculationService,){

    this.submitted = false;

    this._customerCount.getPendingValue().subscribe(count=>{
      this.customersCount = count;
    } );
    
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
      paidStatus: true,
    }

    this.selectCustomerId = custCreditDetails.customerId;
   
    this.custService.addCreditDetails(this.selectCustomerId, custCreditDetails, true).subscribe(data=>{
      console.log(data);
      this._customerCount.getPendingValue().subscribe(count=>{
        this.customersCount = count;
        // this.customersCount[1] = count[1]++;
      } );

      this.customersCount = [this.customersCount[0] - 1, this.customersCount[1]];
      this._customerCount.setPendingValue(this.customersCount);
      this.advancePayCount.emit(this.customersCount);

      this.submitted = true;
      form.reset();
      // this.getCustomerList();
    });

    const endTime = performance.now();
    this._executionTimeService.setValue(startTime, endTime);

  }
  
}
