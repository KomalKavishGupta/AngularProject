import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { ViewEditCustomerPaymentComponent } from './view-edit-customer-payment/view-edit-customer-payment.component';
import { PendingCustomersComponent } from './pending-customers/pending-customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';
import { DepositAmountComponent } from './deposit-amount/deposit-amount.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewChartOverviewComponent } from './view-chart-overview/view-chart-overview.component';


@NgModule({
  declarations: [
    CustomerComponent,
    NewRegistrationComponent,
    ViewEditCustomerPaymentComponent,
    PendingCustomersComponent,
    UpdatePaymentComponent,
    DepositAmountComponent,
    ViewChartOverviewComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerModule { }
