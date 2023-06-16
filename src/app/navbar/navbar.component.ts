import { Component, OnInit } from '@angular/core';
import { ExecutionTimeCalculationService } from '../services/execution-time-calculation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  executedTime: any = 0.00;
  isActive: boolean = false;

  constructor(private _timeCalculation: ExecutionTimeCalculationService, private _router: Router){
    _timeCalculation.getValue().subscribe(data=>{
      this.executedTime = data;
    });

   _timeCalculation.getLoggedInVal().subscribe(data=>{
      this.isActive = data;
    });

  }

  ngOnInit(): void {
    // if (localStorage.hasOwnProperty("businessName")) {
    //   this.isActive = true;
    // }
    // else{
    //   this.isActive = false;
    // }
    // console.log(this.isActive);
  }

  onLogout(){
    localStorage.clear();
    this._timeCalculation.setLoggedInVal(false);
    this._router.navigate(['/login']);
  }
}
