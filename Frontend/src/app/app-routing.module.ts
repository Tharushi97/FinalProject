import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewPositionComponent } from './add-new-position/add-new-position.component';
import { NewPostComponent } from './new-post/new-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { PositionListComponent } from './position-list/position-list.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';
import { VaccancyComponent } from './vaccancy/vaccancy.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { CVDetailsComponent } from './cvdetails/cvdetails.component';
import { EvaluatedListComponent } from './evaluated-list/evaluated-list.component';
import { RateCVComponent } from './rate-cv/rate-cv.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { AuthGuard } from './auth/auth.guard';
import { ApplicantApplicationReviewerComponent } from './applicant-application-reviewer/applicant-application-reviewer.component';
import { ProfileComponent } from './profile/profile.component';
import { SelectPositionComponent } from './recruitment/select-position/select-position.component';
import { RecruitComponent } from './recruitment/recruit/recruit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'Home', component: HomeComponent },
  { path: 'Dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'userManagement', component: UserManagementComponent ,canActivate: [AuthGuard]},
  { path: 'userProfile', component: UserProfileComponent,canActivate: [AuthGuard] },
  { path: 'NewPosition', component: AddNewPositionComponent,canActivate: [AuthGuard] },
  { path: 'NewPost', component: NewPostComponent ,canActivate: [AuthGuard]},
  { path: 'JobPosts', component: JobPostsComponent ,canActivate: [AuthGuard]},
  { path: 'PositionList', component: PositionListComponent,canActivate: [AuthGuard] },
  { path: 'Test', component: TestComponent,canActivate: [AuthGuard] },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'Vacancy', component: VaccancyComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'EmployeesList', component: EmployeesListComponent,canActivate: [AuthGuard] },
  { path: 'ApplicantList', component: ApplicantListComponent,canActivate: [AuthGuard] },
  { path: 'applicant-evaluator', component: ApplicantApplicationReviewerComponent ,canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'CVDetails', component: CVDetailsComponent,canActivate: [AuthGuard] },
  { path: 'EvaluatedList', component: EvaluatedListComponent ,canActivate: [AuthGuard]},
  { path: 'RateCV', component: RateCVComponent ,canActivate: [AuthGuard]},
  { path:'RecruitPositions', component: SelectPositionComponent,canActivate: [AuthGuard]},
  { path:'Recruitment/:id', component: RecruitComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
