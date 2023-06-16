import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerCreditService } from 'src/app/services/customer-credit.service';
import { ExecutionTimeCalculationService } from 'src/app/services/execution-time-calculation.service';

@Component({
  selector: 'app-pending-customers',
  templateUrl: './pending-customers.component.html',
  styleUrls: ['./pending-customers.component.css']
})


export class PendingCustomersComponent implements OnInit{

  page = 1;
  count = 0;
  pageSize = 5;

  totalCount: number = 0;
  loading: boolean = false;
  filteredCustomers: any;
  pendingCustomer: Array<any> = [];
  constructor(private custService: CustomerCreditService, private _executionTimeService: ExecutionTimeCalculationService){
   
  }

  
  ngOnInit(){
    this.loading = true;
    setTimeout(() => {
      this.getPendingCustomerList();
      /** spinner ends after 5 seconds */
     //  this.spinner.hide();
     this.loading = false;
    }, 3000);
  }

  getPendingCustomerList(){
    const startTime = performance.now();

    const ownerId = localStorage.getItem("ownerId");

      this.custService.getPendingCustomers(ownerId).subscribe(data=>{
        this.pendingCustomer = data;
        this.filteredCustomers = data;
        this.totalCount = data.length;
      });    

    const endTime = performance.now();
    this._executionTimeService.setValue(startTime, endTime);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getPendingCustomerList();
  }
 
  filterByName(event: any){
    this.filteredCustomers = this.pendingCustomer.filter(customer => customer.customerName.toLowerCase().includes(event.target.value.toLowerCase()));
   }
 

}
