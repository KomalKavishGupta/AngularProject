import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExecutionTimeCalculationService {

  private executionTime = new BehaviorSubject<any>(0);
  private isloggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  setValue(startTime: any, endTime: any) {

    const calculatedTime = endTime - startTime;
    this.executionTime.next(calculatedTime);
    
  }

  getValue() {
    return this.executionTime.asObservable();
  }

  setLoggedInVal(isActive: boolean){
    this.isloggedIn.next(isActive);
  }

  getLoggedInVal() {
    return this.isloggedIn.asObservable();
  }

}
