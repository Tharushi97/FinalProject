import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { UserService } from "../services/user.service";
import { User } from "../modelClasses/user";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  userDetails;

  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.userService.getUserProfile().subscribe(
    // res => {
    //   this.userDetails = res['user'];
    //  },
    //  err => {
    //    console.log(err);

    //  }
    // );
    this.resetForm();
    this.refreshUserList();
    this.authenticationService.currentUser.subscribe(val => {
      console.log(val);
      this.authenticationService
        .getUserPrivilages(this.parseJwt(val.token)._id)
        .subscribe((val: any) => {
          console.log(val);
          this.userService.selectedUser = val;
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

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.userService.selectedUser = {
      _id: null,
      firstname: "",
      lastname: "",
      email: "",
      userName: "",
      password: "",
      address: "",
      city: "",
      country: "",
      postalCode: null,
      about: "",
      accessLevel: null,
      rateCVs: false,
      sendMails: false,
      interview: false
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.value._id) {
      this.userService.postUser(form.value).subscribe(res => {
        // this.resetForm(form);
        alert("Updated");
        this.refreshUserList();
        console.log("post");
        console.log(res);
      });
    } else {
      this.userService.putUser(form.value).subscribe(res => {
        // this.resetForm(form);
        alert("Updated");
        this.refreshUserList();
        console.log("put");
        console.log(res);
      });
    }
  }

  refreshUserList() {
    this.userService.getUserList().subscribe(res => {
      this.userService.users = res as User[];
    });
  }
}
