import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RestApiService } from '../services/rest-api.service';
import { Employee } from '../modelClasses/employee';
import * as _ from "lodash";
import * as moment from 'moment';
import { reject } from 'q';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public sending =  false
  search_name = '';
  search_email = '';
  search_rate = 'Any';
  search_status = 'Any';
  rate = ['1', '2', '3', '4', '5', 'Any'];
  stat = [ 'Not Selected', ' Interview Scheduled','Shortlisted',''];
  inde = 0;
  updatedUser: any;
  employees: Employee[] = [];
  //@Input() employeeDetails = { name: '', email: '',date:'',rating:''}

  constructor(
    public restApi: RestApiService, 
    public router: Router,
    public location: Location
  ) { }

  refresh(): void {
    window.location.reload();
}
  async ngOnInit() {
    this.loadEmployees();
  }

  // Get employees list
  loadEmployees() {
 this.restApi.getEmployees().subscribe((data) => {
   console.log(data)
      this.employees = data;

   },err=>{
     console.log(JSON.stringify(err))
   });
 }


  // Delete employee
  deleteEmployee(_id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteEmployee(_id).subscribe(data => {
      })
      location.reload();
    }
  }


  updateUserStatus(employee){

   
    // alert(JSON.stringify(employee))
    return new Promise((resolve,reject)=>{
      if (window.confirm('Do you want to send email')) {
        employee.interviewSheduled = true;
      this.restApi.updateUserDetails(employee).subscribe(
        res=>{
          // alert("response employee"+JSON.stringify(res.body))
          this.updatedUser = res.body;
          resolve(res.body)
        },err=>{
          console.log("error in updating user"+JSON.stringify(err))
        }
      ) }
    })

  
  }

 

  sendEmail(employee,date) {
    let  employeeObject 
    let dateObject
    dateObject = {
      date:moment(date.valueAsDate).format('MM-DD-YYYY')
    }
    employeeObject = _.merge(employee,dateObject)
    // alert("employee obkect here"+JSON.stringify(employeeObject))
   this.updateUserStatus(employeeObject).then(
     res=>{
        if(employeeObject.rate > "3"){
          this.restApi.sendEmails(employeeObject._id,employeeObject.email,employeeObject.date).subscribe(data => {
            this.sending=true;
          });
         
          this.updatedEmployee(employeeObject)
        }
        else{
          // employee.status = 'Not Selected';
        }
      
     }
   )
  }

  updatedEmployee(emplyee: Employee) {
      this.restApi.updateEmployee({ _id: emplyee._id, employee: emplyee }).subscribe(value => {
    });
  }

}
