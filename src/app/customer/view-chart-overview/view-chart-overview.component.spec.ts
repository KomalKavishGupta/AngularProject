import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChartOverviewComponent } from './view-chart-overview.component';

describe('ViewChartOverviewComponent', () => {
  let component: ViewChartOverviewComponent;
  let fixture: ComponentFixture<ViewChartOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChartOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChartOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
