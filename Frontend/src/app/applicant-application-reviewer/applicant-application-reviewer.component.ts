import { Component, OnInit } from '@angular/core';
import { IApplicant, Applicant } from '../modelClasses/applicant';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantManagementService } from '../services/application-management.service';
import { MatDialog } from '@angular/material';
import { CvViewerComponent } from '../cv-viewer/cv-viewer.component';

@Component({
  selector: 'app-applicant-application-reviewer',
  templateUrl: './applicant-application-reviewer.component.html',
  styleUrls: ['./applicant-application-reviewer.component.css']
})
export class ApplicantApplicationReviewerComponent implements OnInit {
  applicant: IApplicant
  evaluating: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private applicantManagementService: ApplicantManagementService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.applicant = new Applicant()
    this.activatedRoute.queryParams.subscribe(
      params=>{
        this.applicant._id = params["id"]
       this.applicant.firstname = params["firstname"]
       this.applicant.lastname = params["lastname"]
       this.applicant.nic = params["nic"]
      this.applicant.cv  = params["cv"]
      this.applicant.linkedin = params['linkedin']
      this.applicant.email = params['email']
      this.applicant.evaluated = params['evaluated']
      this.applicant.mobile = params['mobile']
      this.applicant.referral = params['referral']
      this.applicant.cvDoc = params['cvDoc']
      // alert(JSON.stringify(this.applicant)+'from application')
      },err=>{
        // alert(JSON.stringify(err))
      }
    )
  }

  viewCV(cvPdf){
    const dialogRef = this.dialog.open(CvViewerComponent,
      {
        width: '900px',
        height: '800px',

        data: {'cvDoc':cvPdf}
      })
  }

  evaluate(applicant){
    this.evaluating = true;
    applicant.evaluated = true
    applicant.interviewSheduled = false
    if(applicant.rate>=3){
      applicant.shortlisted=true;
    }else{
      applicant.shortlisted=false;
    }
    alert(JSON.stringify(applicant))
    this.applicantManagementService.setEvaluated(applicant,applicant._id).subscribe(
      res=>{
        this.evaluating=false
        console.log("User saved succesfully "+JSON.stringify(res.body))
        this.router.navigate(['/EvaluatedList'])
      },err=>{
        console.log("error in saving "+JSON.stringify(err))
      }
    )
  }


  viewApplicants(){
    this.router.navigate(['/all-applicants'])
  }

  viewEvaluated(){
    this.router.navigate(['/EvaluatedList'])
  }
  

}
