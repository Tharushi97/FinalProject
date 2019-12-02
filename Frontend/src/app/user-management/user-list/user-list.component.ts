import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/modelClasses/user";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from "src/app/services/notification.service";
import { DialogService } from "src/app/services/dialog.service";
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  constructor(
    public service: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  //accessLevel = [
  //{ id: 1, value: 'Manager' },
  // { id: 2, value: 'Director' },
  // { id: 3, value: 'Recruiter' },
  //{ id: 4, value: 'Other' }
  //];

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ["fullname", "email", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    //this.refreshUserList();
    this.service.getUserList().subscribe(res => {
      this.service.users = res as User[];
      this.listData = new MatTableDataSource(this.service.users);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      //this.listData.filterPredicate = (data, filter) => {
      //return this.displayColumns.some(ele => {
      //return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      // });
      //};
    });
  }

  //refreshUserList() {
  // this.service.getUserList().subscribe((res) => {
  //  this.service.users = res as User[];
  // this.listData = new MatTableDataSource(this.service.users);
  // this.listData.sort = this.sort;
  // this.listData.paginator = this.paginator;
  // this.listData.filterPredicate = (data, filter) => {
  //   return this.displayColumns.some(ele => {
  //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //  });
  //  };
  // });
  // }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddUserComponent, dialogConfig);
  }

  onEdit(row) {
    delete row.__v;
    delete row.accessLevel;
    delete row.address;
    delete row.city;
    delete row.country;
    delete row.postalCode;
    delete row.about;
    console.log(row);

    this.service.populateForm(row);
    console.log(this.service.form.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddUserComponent, dialogConfig);
  }

  onDelete(id) {
    // if (confirm("Are you sure to delete this record ?")) {
    //   this.service.deleteUser(id).subscribe(res => {
    //     this.notificationService.warn("! Deleted successfully");
    //   });
    // }

     this.dialogService
      .openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.deleteUser(id).subscribe(res => {
            //this.refreshUserList();
            this.notificationService.warn("! Deleted successfully");
          });
        }
      }); 
  }
}
