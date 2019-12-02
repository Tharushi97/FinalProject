import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Applicant } from '../modelClasses/applicant';
import { ApplicantManagementService } from '../services/application-management.service';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {
  applicants: Applicant[] = []
  constructor(
    private usermanagementService: ApplicantManagementService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getAllNonEvaluateds()
  }


  viewApplicants(){
    this.router.navigate(['/all-applicants'])
  }

  viewEvaluated(){
    this.router.navigate(['/evaluated-applicants'])
  }


  getAllNonEvaluateds() {
    this.usermanagementService.getAllApplicants().subscribe(
      res => {

        this.applicants = res.body
        // res.body.forEach(element => {
        //   this.applicant.push(element)
        // });
        // this.applicant.push()
        console.log('applicants : ' + JSON.stringify(res.body))
      }, err => {
        console.log("error getting aplicants : " + JSON.stringify(err))
      }
    )
  }


  viewDetails(applicant) {
    alert(JSON.stringify(applicant))
    // let app = JSON.stringify(applicant)
    let navigationExtras: NavigationExtras={
      queryParams:{
        'id':applicant._id,
        'firstname': applicant.firstname,
        'lastname': applicant.lastname,
        'email': applicant.email,
        'nic': applicant.nic,
        'cv': applicant.cv,
        'mobile':applicant.mobile,
        'linkedin':applicant.linkedin,
        'evaluated': applicant.evaluated,
        'referral': applicant.referral,
        'cvDoc': applicant.cvDoc

      }
    }
    this.router.navigate(['/applicant-evaluator'],navigationExtras)
  }

}
