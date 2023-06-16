import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { end } from '@popperjs/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerCreditService } from 'src/app/services/customer-credit.service';
import { ExecutionTimeCalculationService } from 'src/app/services/execution-time-calculation.service';

@Component({
  selector: 'app-view-edit-customer-payment',
  templateUrl: './view-edit-customer-payment.component.html',
  styleUrls: ['./view-edit-customer-payment.component.css']
})
export class ViewEditCustomerPaymentComponent implements OnInit{
  
//creditForm: FormGroup;
//@ViewChild('contactForm') contactForm: NgForm;
page = 1;
count = 0;
pageSize = 5;

 closeResult: string = "";
 totalCount: number = 0;
 loading: boolean = false;
 selectCustomerId: number;
 selectedCustomer: string;
 updatedContact:any;
 creditmodal: any;
 submitted: boolean = false;
 checkBoxValue: boolean = false;
 filteredCustomers: any;
  customerDetails: Array<any> = [];

  constructor(private modalService: NgbModal, private custService: CustomerCreditService, 
    private _executionTimeService: ExecutionTimeCalculationService, private spinner: NgxSpinnerService){}

  ngOnInit(){
     /** spinner starts on init */
    // this.spinner.show();
    this.loading = true;
     setTimeout(() => {
      this.getCustomerList();
       /** spinner ends after 5 seconds */
      //  this.spinner.hide();
      this.loading = false;
     }, 3000);

    this.selectCustomerId = 0;
    this.selectedCustomer = "";
    this.submitted = false;
  }

  onChangeValue(event: any){
  this.checkBoxValue = event.target.checked;
  }

  getCustomerList(){
    const startTime = performance.now();
      const ownerId = localStorage.getItem("ownerId");
        this.custService.getCustomers(ownerId).subscribe(data=>{
          this.customerDetails = data;
          this.filteredCustomers = data;
          this.totalCount = data.length;
          console.log(this.customerDetails);
        }
          );   

    const endTime = performance.now();

    this._executionTimeService.setValue(startTime, endTime);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getCustomerList();
  }

  filterByName(event: any){
   this.filteredCustomers = this.customerDetails.filter(customer => customer.customerName.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  deleteCustomer(id: number){
    this.custService.deleteCustomerById(id).subscribe(data=> console.log(data));
  }


  open(content: any, custId: number,name: string ) {

    this.selectCustomerId = custId;
    this.selectedCustomer = name;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.getCustomerList();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(form: NgForm){
    const startTime = performance.now();

    this.updatedContact = form.control.value.contact.toString();

    const contactDetails ={
      id: this.selectCustomerId,
      contact: this.updatedContact
    }

   this.custService.updateCustomerContact(this.selectCustomerId,  contactDetails).subscribe(data=>{
   console.log(data);
   });
   this.submitted = true;
   const endTime = performance.now();
   this._executionTimeService.setValue(startTime, endTime);
  }

  resetForm(){
   // this.creditForm.reset();
  }
}
