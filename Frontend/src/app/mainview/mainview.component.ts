import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-mainview",
  templateUrl: "./mainview.component.html",
  styleUrls: ["./mainview.component.css"]
})
export class MainviewComponent implements OnInit {
  interview = false;
  rateCVs = false;
  sendMails = false;
  role;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(val => {
      console.log(val);
      this.authenticationService
        .getUserPrivilages(this.parseJwt(val.token)._id)
        .subscribe((val: any) => {
          console.log(val);
          this.interview = val.interview;
          this.rateCVs = val.rateCVs;
          this.sendMails = val.sendMails;
          this.role = val.firstname;
        });
    });
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}
