import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomerCreditService } from '../services/customer-credit.service';
import { forkJoin } from 'rxjs';
import { CustomerCountService } from '../services/customer-count.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit, OnChanges {
  itemNumber: number = 1;
  storeName: any;
  ownerId: any;
  customersCount: any[] = [0,0];
  pendingCustomer: number = 0;
  totalCustomer: number = 0;

  constructor(private custService:CustomerCreditService,
    private _customerCount: CustomerCountService){

    this.storeName = localStorage.getItem("businessName");
    this.ownerId = localStorage.getItem("ownerId");

  }

  ngOnInit(){
    forkJoin(
      [ this.custService.getPendingCustomersCount(this.ownerId),
        this.custService.getTotalCustomersCount(this.ownerId)
    ]).subscribe(data=>{

      this.customersCount = data;
      this._customerCount.setPendingValue(this.customersCount);

      console.log(data);
    })

  }

  onPCount(event: any){
    this.customersCount = event;
  }

  onAdvancePay(event: any){
    this.customersCount = event;
  }

ngOnChanges(changes: SimpleChanges): void {
  
}

  selectList(item: number){
    this.itemNumber = item;
  }
  

}
