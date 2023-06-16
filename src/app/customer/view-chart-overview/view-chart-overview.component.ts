import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { CustomerCreditService } from 'src/app/services/customer-credit.service';
import { ExecutionTimeCalculationService } from 'src/app/services/execution-time-calculation.service';

@Component({
  selector: 'app-view-chart-overview',
  templateUrl: './view-chart-overview.component.html',
  styleUrls: ['./view-chart-overview.component.css']
})


export class ViewChartOverviewComponent implements OnInit, AfterViewInit {

  public chart: any;
  loading: boolean = true;
  ownerId: any;
  customersCount: any[] = [0,0];
  lossPercentage: any;
  overallProfit: number = 0;

  @ViewChild('theDonutCanvas') donutCanvas: ElementRef;

  constructor(private custService: CustomerCreditService,
    private _executionTimeService: ExecutionTimeCalculationService){
    this.ownerId = localStorage.getItem("ownerId");
  }

  ngOnInit(): void {
    this.loading = true;
    const startTime = performance.now();

    forkJoin(
      [ this.custService.getPendingCustomersCount(this.ownerId),
        this.custService.getTotalCustomersCount(this.ownerId)
    ]).subscribe(data=>{

      this.customersCount = data;
      this.lossPercentage = (this.customersCount[0]/this.customersCount[1])*100;
      this.overallProfit = ((this.customersCount[1] - this.customersCount[0])/this.customersCount[1])*100;

      const endTime = performance.now();
      this._executionTimeService.setValue(startTime, endTime);
    })

  }

ngAfterViewInit(): void {
 
    setTimeout(()=>{
      this.createChart();
    }, 2000)

}

  createChart(){
  
    this.chart = new Chart(this.donutCanvas.nativeElement, {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: [
          'Loss %',
          'Profit %',
          'Total Customer'
        ],
        datasets: [{
          // label: 'My First Dataset',
          data: [this.lossPercentage, this.overallProfit, this.customersCount[1]],
          backgroundColor: [
            '#e6172b94',
            '#056337a1',
            '#fad461'
          ],
         hoverOffset: 1
        }]
      },
      options:{
        
      }
    
    });
   this.loading = false;
  }
}


