import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerCountService {

private pendingCustomerCount: BehaviorSubject<any> = new BehaviorSubject([0,0]);  
private totalCustomers: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  setPendingValue(count: any) {
    // const calculatedTime = endTime - startTime;
     this.pendingCustomerCount.next(count);
    
  }

  getPendingValue() {
    return this.pendingCustomerCount.asObservable();
  }
}
