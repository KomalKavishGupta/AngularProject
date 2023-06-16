import { Component, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCountService } from 'src/app/services/customer-count.service';
import { CustomerCreditService } from 'src/app/services/customer-credit.service';
import { ExecutionTimeCalculationService } from 'src/app/services/execution-time-calculation.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})

export class NewRegistrationComponent {

  @Output() pendingCount: EventEmitter<any> = new EventEmitter(); 
  //regForm: FormGroup;
  customersCount: any[] = [0,0];

  constructor(private custService: CustomerCreditService, 
    private _executionTimeService: ExecutionTimeCalculationService,
    private _customerCount: CustomerCountService, private _router: Router){
       
      this._customerCount.getPendingValue().subscribe(count=>{
        this.customersCount = count;

        this._executionTimeService.setValue(0, 0);
      } );
  }

  onSubmit(custRegForm: NgForm){

    const startTime = performance.now();

    const newCustomerDetails = {
    customerName: custRegForm.control.value.customerName.toString(),
    contact: custRegForm.control.value.phone.toString(),
    address: custRegForm.control.value.address.toString(),
    uniqueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    totalCreditAmount: custRegForm.control.value.credit,
    custUniqueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }

    this.custService.addCustomer(newCustomerDetails, localStorage.getItem("ownerId")).subscribe(data=>{
      console.log(data);
     
      this._customerCount.getPendingValue().subscribe(count=>{
        this.customersCount = count;
        // this.customersCount[1] = count[1]++;
      } );

      this.customersCount = [this.customersCount[0] + 1, this.customersCount[1] + 1];
      this._customerCount.setPendingValue(this.customersCount);
      this.pendingCount.emit(this.customersCount);

      const endTime = performance.now();
      this._executionTimeService.setValue(startTime, endTime);  
      
      custRegForm.reset();

      window.alert("Customer has been added successfully!!");
    });
  }

  resetForm(){
   
  }
}
