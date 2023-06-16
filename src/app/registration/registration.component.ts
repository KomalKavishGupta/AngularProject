import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerCreditService } from '../services/customer-credit.service';
import { Owner } from '../Models/owner';
import { Router } from '@angular/router';
import { ExecutionTimeCalculationService } from '../services/execution-time-calculation.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  selectedFile: ImageSnippet;

  imageSrc: string;
  constructor(private custService: CustomerCreditService,
    private _executionTimeService: ExecutionTimeCalculationService, private _router: Router){
    this._executionTimeService.setValue(0, 0);
  }

  onSubmit(regForm: NgForm){

   const startTime = performance.now();
   const ownerDetails: Owner = {
      businessName: regForm.control.value.sname,
      // file: regForm.control.value.file,
      ownerName: regForm.control.value.oname,
      email: regForm.control.value.email,
      password: regForm.control.value.password,
      contact: regForm.control.value.contact.toString(),
      address: regForm.control.value.address,
    }
    this.custService.addOwner(ownerDetails).subscribe(data=>{
      console.log(data);
    });

    const endTime = performance.now();
    this._executionTimeService.setValue(startTime, endTime);  

    window.alert("Your registeration has been done successfully!! Please continue to login.");
    this._router.navigate(['/login']);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
        
      //   },
      //   (err) => {
        
      //   })
    });

    reader.readAsDataURL(file);
  }

  // onFileChange(event: any){
  //   const reader = new FileReader();

  //   if(event.target.files && event.target.files.length) {

  //     const [file] = event.target.files;

  //     reader.readAsDataURL(file);

  //     reader.onload = () => {

  //       this.imageSrc = reader.result as string;
  //     console.log(" this.imageSrc", this.imageSrc)
  //    console.log("image", reader.result);

  //       // this.regForm.patchValue({

  //       //   fileSource: reader.result

  //       // });

  //     };

  //   }
  // }
  
}
