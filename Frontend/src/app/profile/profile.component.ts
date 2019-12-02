import { Component, OnInit } from "@angular/core";
import { IApplicant, Applicant } from "../modelClasses/applicant";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ApplicantManagementService } from "../services/application-management.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public saving = false;
  public view = false;
  public viewComments = false;
  public viewWritten = false;
  note: string;
  interviewComment: string;
  writtenResult: string;
  // editorConfig: any
  pdfDoc: any;
  img: string;
  applicant: IApplicant;
  rate: any;
  points: number;
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private applicantService: ApplicantManagementService
  ) {
    this.img = `url(https://media.giphy.com/media/ZcdJJvDqTgdGZK8Xd3/giphy.gif)`;
  }

  editorConfig = {
    editable: true,
    spellcheck: false,
    height: "10rem",
    minHeight: "5rem",
    // placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
    translate: "no"
  };

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.applicant = new Applicant();
    this.activatedRouter.queryParams.subscribe(params => {
      this.applicant._id = params["id"];
      //   this.applicant.firstname = params["firstname"]
      //   this.applicant.lastname = params["lastname"]
      //   this.applicant.nic = params["nic"]
      //  this.applicant.cv  = params["cv"]
      //  this.applicant.cvDoc = params['cvDoc']
      //  this.applicant.linkedin = params['linkedin']
      //  this.applicant.email = params['email']
      this.rate = params["rate"];
      //  this.applicant.evaluated = params['evaluated']
      //  this.applicant.mobile = params['mobile']
      //  this.applicant.referral = params['referral']
    });
    this.getUserData();
  }

  getUserData() {
    this.applicantService.getSingleUser(this.applicant._id).subscribe(
      res => {
        this.applicant = res.body;
        this.applicant.rate = this.rate;
        if (this.applicant.interviewPoints) {
          this.points = this.applicant.interviewPoints;
        }
        if (!this.applicant.notes) {
          this.applicant.notes = [];
        }
        if (!this.applicant.interviewerComments) {
          this.applicant.interviewerComments = [];
        }

        this.pdfDoc = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.applicant.cvDoc
        );
        console.log("getting user data" + JSON.stringify(res.body));
      },
      err => {
        console.log("getting error" + JSON.stringify(err));
      }
    );
  }

  updateFullUser() {
    this.applicantService.updateUser(this.applicant).subscribe(
      res => {
        this.saving = false;
        this.interviewComment = null;
        this.writtenResult = null;
        this.getUserData();
        // console.log("user updated succesffully"+JSON.stringify(res.body))
      },
      err => {
        console.log("failed updating user" + JSON.stringify(err));
      }
    );
  }

  goBack() {
    this.router.navigate(["/EvaluatedList"]);
  }

  saveFinancials() {
    this.saving = true;
    this.updateFullUser();
  }

  saveInterviewComments() {
    this.saving = true;
    if (this.interviewComment) {
      this.applicant.interviewerComments.push(this.interviewComment);
    }

    this.applicant.interviewPoints = this.points;
    if (this.writtenResult) {
      this.applicant.writtenResults.push(this.writtenResult);
    }

    this.updateFullUser();
  }

  viewEWritten() {
    this.viewWritten = !this.viewWritten;
    this.viewComments = false;
  }

  viewENotes() {
    console.log("view is : " + this.view);

    this.view = !this.view;
  }

  viewEComments() {
    this.viewWritten = false;
    this.viewComments = !this.viewComments;
  }

  saveNote() {
    this.saving = true;
    // alert(this.note)
    // this.applicant.notes =this.note
    this.applicant.notes.push(this.note);
    this.applicantService.setNotes(this.applicant).subscribe(
      res => {
        this.note = null;
        this.applicant.notes = [];
        this.saving = false;
        this.applicant.notes.push(res.body.notes);
        this.getUserData();
        // alert(this.applicant.notes)
        console.log("saved notes successfully" + JSON.stringify(res.body));
      },
      err => {
        console.log("error in savig notes" + JSON.stringify(err));
      }
    );
  }
}
