import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { CustomServiceService } from '../services/custom-service.service';
import { CustomerCreditService } from '../services/customer-credit.service';
import { Router } from '@angular/router';
import { ExecutionTimeCalculationService } from '../services/execution-time-calculation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInvalid: boolean = false;
  constructor(private _service: CustomerCreditService, private _executionTimeService: ExecutionTimeCalculationService,
     private _router: Router){
      this._executionTimeService.setValue(0, 0);
      this._executionTimeService.setLoggedInVal(false);
  }

  ngOnInit(): void {
    this.loginInvalid = false;
  }

onSubmit(loginForm: NgForm){
  
  this._service.login(loginForm.control.value).subscribe(data=>{
    console.log(data);
    if(data != null || data!= undefined){
      this.loginInvalid = false;
      localStorage.setItem("ownerId",data.id);
      localStorage.setItem("businessName", data.businessName);
      this._executionTimeService.setLoggedInVal(true);
      this._router.navigate(['/customer']);
  
    }
    else{
      this.loginInvalid = true;
    }
  });
}
}
