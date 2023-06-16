import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';

const routes: Routes = [
 { path: '', component: CustomerComponent},
// {path: 'newcustomer', component: NewRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
