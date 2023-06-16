import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditCustomerPaymentComponent } from './view-edit-customer-payment.component';

describe('ViewEditCustomerPaymentComponent', () => {
  let component: ViewEditCustomerPaymentComponent;
  let fixture: ComponentFixture<ViewEditCustomerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditCustomerPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditCustomerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
