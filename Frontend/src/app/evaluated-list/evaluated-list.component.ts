import { Component, OnInit } from '@angular/core';
import { Applicant } from '../modelClasses/applicant';
import { ApplicantManagementService } from '../services/application-management.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-evaluated-list',
  templateUrl: './evaluated-list.component.html',
  styleUrls: ['./evaluated-list.component.css']
})
export class EvaluatedListComponent implements OnInit {
  evaluatedApplicants: Applicant[]=[]
  constructor(
    private applicantManagementService: ApplicantManagementService,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.getEvalutaedApplicants();
  }
  getEvalutaedApplicants(){
    this.applicantManagementService.getAllEvaluated().subscribe(
      res=>{
        console.log(res.body)
        this.evaluatedApplicants = res.body
      },err=>{
        console.log(JSON.stringify(err))
      }
    )
  }

  viewProfile(evaluatedApplicant){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        'id': evaluatedApplicant._id,
        'firstname': evaluatedApplicant.firstname,
        'lastname': evaluatedApplicant.lastname,
        'email': evaluatedApplicant.email,
        'nic': evaluatedApplicant.nic,
        'cv': evaluatedApplicant.cv,
        'mobile':evaluatedApplicant.mobile,
        'linkedin':evaluatedApplicant.linkedin,
        'rate': evaluatedApplicant.rate,
         'cvDoc': evaluatedApplicant.cvDoc,
        'evaluated': evaluatedApplicant.evaluated,
        'referral': evaluatedApplicant.referral
      }
    }
    this.router.navigate(['/profile'],navigationExtras)
  }
}
