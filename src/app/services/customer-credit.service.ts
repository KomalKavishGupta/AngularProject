import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Owner } from '../Models/owner';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreditService {
 // https://localhost:7025/api/CustomerCredit/updateContact/5?contact=9123450909
  readonly apiUrl = 'https://localhost:7025/api/CustomerCredit';
  readonly ownerapiurl = 'https://localhost:7025/api/Owner';
  
  constructor(private _http: HttpClient) { }

  login(userData: any): Observable<any>{
   // const creds = userData.email + ":" + userData.password;
   
//     const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Authorization: 'Basic' + btoa(creds)
//     }),
//     responseType: 'text'
// };

    return this._http.post<any>(this.ownerapiurl + '/Login/', userData).pipe(catchError(error=> this.handleError(error))); 
  }

  getCustomers(ownerId: any): Observable<any>{
    return this._http.get<any>(this.apiUrl + '/' + ownerId).pipe(catchError(error=> this.handleError(error)));
  }

  getTotalCustomersCount(ownerId: any): Observable<any>{
    return this._http.get<any>(this.apiUrl + '/totalCustomerCount/' + ownerId).pipe(catchError(error=> this.handleError(error)));
  }

  getPendingCustomers(ownerId: any): Observable<any>{
    return this._http.get<any>(this.apiUrl + '/pendingCustomers/' + ownerId).pipe(catchError(error=> this.handleError(error)));
  }

  getPendingCustomersCount(ownerId: any): Observable<any>{
    return this._http.get<any>(this.apiUrl + '/pendingCustomerCount/' + ownerId).pipe(catchError(error=> this.handleError(error)));
  }

  addOwner(owner: Owner): Observable<any>{
    return this._http.post<any>(this.ownerapiurl, owner).pipe(catchError(error=> this.handleError(error)));
  }
  addCustomer(newCustomer: any, ownerId: any): Observable<any>{
    return this._http.post<any>(this.apiUrl + '/addCustomer/' + ownerId, newCustomer).pipe(catchError(error=> this.handleError(error)));
  }

  addCreditDetails(id: number, creditDetails: any, isPaid: boolean): Observable<any>{
  return this._http.post<any>(this.apiUrl + '/addCustomerCredit/'+ id, creditDetails).pipe(catchError(error=> this.handleError(error)));
  }

  deleteCustomerById(id: number){
    return this._http.delete<any>(this.apiUrl + '/'+ id).pipe(catchError(error=>this.handleError(error)));
  }

  updateCustomerContact(custId: number, contact: any){
    return this._http.put<any>(this.apiUrl + '/updateContact/' + custId, contact).pipe(catchError(error=> this.handleError(error)));
  }

  private handleError(err: HttpErrorResponse | any){
    const errorMsg = err.message || 'Error: unable to complete the request';
    //return throwError(errorMsg);
    return errorMsg;
  }
}
