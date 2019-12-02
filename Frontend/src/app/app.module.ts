import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { AddNewPositionComponent } from './add-new-position/add-new-position.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PositionListComponent } from './position-list/position-list.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostNewPositionService } from './services/post-new-position.service';
import { TestComponent } from './test/test.component';
import { MainviewComponent } from './mainview/mainview.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule }    from '@angular/router';
import { VaccancyComponent } from './vaccancy/vaccancy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule,MatToolbarModule,MatInputModule, MatDialogModule, MatIconModule, MatProgressBarModule, MatExpansionModule} from '@angular/material';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from './material/material.module';

import { environment } from 'src/environments/environment.prod';
import {ApiServiceService} from './services/api-service.service';

import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { EvaluatedListComponent } from './evaluated-list/evaluated-list.component';
import { RateCVComponent } from './rate-cv/rate-cv.component';
import { CVDetailsComponent } from './cvdetails/cvdetails.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { LogoutComponent } from './mainview/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApplicantApplicationReviewerComponent } from './applicant-application-reviewer/applicant-application-reviewer.component';
import { CvViewerComponent } from './cv-viewer/cv-viewer.component';
import { ProfileComponent } from './profile/profile.component';
import { SelectPositionComponent } from './recruitment/select-position/select-position.component';
import { RecruitComponent } from './recruitment/recruit/recruit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    JobPostsComponent,
    AddNewPositionComponent,
    NewPostComponent,
    PositionListComponent,
    HomeComponent,
    TestComponent,
    MainviewComponent,
    RegisterComponent,
    VaccancyComponent,
    LoginComponent,
    AlertComponent,
    EmployeesListComponent,
    ApplicantListComponent,
    EvaluatedListComponent,
    RateCVComponent,
    CVDetailsComponent,
    UserManagementComponent,
    UserProfileComponent,
    UserListComponent,
    MatConfirmDialogComponent,
    AddUserComponent,
    LogoutComponent,
    ApplicantApplicationReviewerComponent,
    CvViewerComponent,
    ProfileComponent,
    SelectPositionComponent,
    RecruitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MaterialModule,
    MatProgressBarModule,
    MatExpansionModule,
    NgxEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard, PostNewPositionService,ApiServiceService
  ],
  entryComponents: [AddUserComponent, MatConfirmDialogComponent, CvViewerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
