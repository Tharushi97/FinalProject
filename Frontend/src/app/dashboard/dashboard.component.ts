import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../modelClasses/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ApplicantManagementService } from '../services/application-management.service';
import { Count } from '../modelClasses/count';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    noOfApplicants;
    noOfInterviews;
    noOfSelected;
    positionCount: Count[] = [];

  constructor(
    public authenticationService: AuthenticationService,
    public applicantService: ApplicantManagementService,
        private userService: UserService
  ) { }

  ngOnInit() {
    this.getNoOfApplicants();
    this.getNoOfInterviews();
    this. getNoOfSelected();
    this.getpositionCount();
  }

  getpositionCount() {
    this.applicantService.getpositionCount().subscribe(
      res => {
        this.positionCount = res.body;
        console.log(this.positionCount);
      }, err => {
        console.log("error getting count : " + JSON.stringify(err))
      }
    )
  }

  getNoOfApplicants() {
    this.applicantService.getCountOfApplicants().subscribe(
      res => {
        this.noOfApplicants = res.body;
        //console.log(this.noOfApplicants);
        //console.log('noOfApplicants : ' + JSON.stringify(res.body))
      }, err => {
        console.log("error getting count : " + JSON.stringify(err))
      }
    )
  }

  getNoOfInterviews() {
    this.applicantService.getCountOfinterviews().subscribe(
      res => {
        this.noOfInterviews = res.body;
        //console.log('noOfInterviews : ' + JSON.stringify(res.body))
      }, err => {
        console.log("error getting count : " + JSON.stringify(err))
      }
    )
  }

  getNoOfSelected() {
    this.applicantService.getCountOfSelected().subscribe(
      res => {
        this.noOfSelected = res.body;
        //console.log('noOfInterviews : ' + JSON.stringify(res.body))
      }, err => {
        console.log("error getting count : " + JSON.stringify(err))
      }
    )
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.currentUserSubscription.unsubscribe();
}

}
