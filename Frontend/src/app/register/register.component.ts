import { Component, OnInit } from "@angular/core";
import { UserModels, IGeveoUser } from "../modelClasses/user-models";
import { PdfUploadServiceService } from "../services/pdf-upload-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiServiceService } from "../services/api-service.service";
import { resolve } from "url";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  attach: File = null;
  applicant: IGeveoUser;
  files: File[] = [];
  urls: any[] = [];
  url: any;
  public saving = false;
  positionId: string;
  constructor(
    private apiService: ApiServiceService,
    private formBuilder: FormBuilder,
    private pdfUploadService: PdfUploadServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.applicant = new UserModels();
    this.registrationForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      nic: [
        "",
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(10),
          Validators.pattern("([0-9]{9}(v|V)|[0-9]{11})")
        ]
      ],
      linkedin: ["", Validators.required],
      mobile: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern("[0-9]{10}")
        ]
      ]
    });

    this.registrationForm.valueChanges.subscribe(res => {
      this.applicant = res;
    });

    this.activatedRoute.params.subscribe(params => {
      this.positionId = params["id"];
    });
  }

  onFileSelected(event) {
    this.attach = <File>event.target.files[0];

    this.files = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      // this.eve = event.target.files;
      //console.log("event : " + JSON.stringify(event.target.files[0]))
      for (let i = 0; i < filesAmount; i++) {
        var reader: any, target: EventTarget;
        reader = new FileReader();
        this.files.push(event.target.files.item(i));
        console.log("event : " + JSON.stringify(event.target.files[0]));
        reader.onload = event => {
          this.urls.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  uploadPdfToStore() {
    return new Promise((resolve, reject) => {
      this.pdfUploadService
        .uploadPdfToStorage(this.files, "CVPdf")
        .then(res => {
          console.log("pdf uploaded" + JSON.stringify(res[0]));
          resolve(res[0]);
        });
    });
  }

  registerUser(user) {
    this.saving = true;
    this.uploadPdfToStore().then(res => {
      console.log("regsiter" + JSON.stringify(res));
      this.applicant.cv = this.attach;
      this.applicant.cvDoc = res;
      this.applicant.evaluated = false;
      this.applicant.positionId = this.positionId;
      if (this.attach != null) {
        const fd = new FormData();
        // alert("Applicant is going to be saved "+JSON.stringify(this.applicant))
        fd.append("attachment", this.attach, this.attach.name);
        // alert(fd)
        this.apiService.uploadAttachment(fd).subscribe(reply => {
          this.saving = false;
          // alert("Applicant is going to be saved "+JSON.stringify(this.applicant))
          this.apiService.registerUser(this.applicant);
          alert(
            "Your applicant record is successfully saved!! Stay alert with emails to check your cv is referred!"
          );
        });
      } else {
        window.alert("You should upload a cv");
      }
    });

    if (!this.registrationForm.valid) {
      alert("Invalid data");
      return;
    }

    // alert("Sucessfully registered")
  }
}
