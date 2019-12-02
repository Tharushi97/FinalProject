import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../modelClasses/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  static form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    // accessLevel: new FormControl(0),
    rateCVs: new FormControl(false),
    sendMails: new FormControl(false),
    interview: new FormControl(false)
  });

  get form() {
    return UserService.form;
  }

  selectedUser: User;
  users: User[];
  readonly baseURL = "http://localhost:3000/api/userModel";

  constructor(private http: HttpClient) {}

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      // accessLevel: null,
      rateCVs: false,
      sendMails: false,
      interview: false
    });
  }

  postUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  putUser(user: User) {
    console.log("put");
    const id = user._id;
    delete user._id;
    console.log(user);
    return this.http.put(this.baseURL + `/${id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  populateForm(user) {
    this.form.setValue(user);
    this.form.updateValueAndValidity();
  }
}
