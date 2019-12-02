import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import { Employee } from '../modelClasses/employee';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Define API
  apiURL = 'http://localhost:3000';
  public updateUserDetailsUrl= "http://localhost:3000/employeev2/updateUserDetail";
  constructor(private http: HttpClient) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<any> {
    return this.http.get(this.apiURL + '/employeev2/getAllNonEvaluatedUsers')
      .pipe(
        catchError(this.handleError)
      );
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employee/' + id)
  }

  // HttpClient API post() method => Create employee


   // HttpClient API put() method => Update employee
   updateEmployee({ _id, employee }: { _id; employee; }): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employee/' + _id+'/updatePerson/', JSON.stringify(employee), this.httpOptions)
  }


  // HttpClient API delete() method => Delete employee
  deleteEmployee(_id) {
    return this.http.delete<Employee>(this.apiURL + '/employee/'+_id+'/delete/', this.httpOptions)
  }

  sendEmails(_id,email,date){
    return this.http.post<Employee>(this.apiURL + '/employee/'+_id+'/'+email+'/'+date+'/send-email/', this.httpOptions)
  }

  confirmApp(_id): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + '/employee/'+_id+'/confirm/', this.httpOptions)
  }

  cancelConfirm(_id): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + '/employee/'+_id+'/cancel-confirm/', this.httpOptions)
  }

  updateState(_id): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employee/'+_id+'/employee.status/', this.httpOptions)
  }

  updateUserDetails(employee):Observable<HttpResponse<any>>{
    return this.http.put<any>(this.apiURL + `/employeev2/updateUserDetail/${employee._id}`,employee,{observe: 'response'})
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
