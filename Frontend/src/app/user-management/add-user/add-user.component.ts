import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User } from "../../modelClasses/user";
import { NotificationService } from "../../services/notification.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {
  constructor(
    public service: UserService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  //accessLevel = [
  //{ id: 1, value: 'Manager' },
  //{ id: 2, value: 'Director' },
  // { id: 3, value: 'Recruiter' },
  // { id: 4, value: 'Other' }
  //];

  ngOnInit() {
    //this.refreshUserList();
    // this.service.initializeFormGroup();
    this.service.getUserList();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value);
      if (!this.service.form.get("_id").value) {
        this.service.postUser(this.service.form.value).subscribe(res => {
          this.service.form.reset();
        });
      } else {
        this.service.putUser(this.service.form.value).subscribe(val => {
          console.log(val);
        });
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(":: Submitted successfully");
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
