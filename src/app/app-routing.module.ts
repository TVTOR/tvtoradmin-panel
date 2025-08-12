import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderComponent } from './header/header.component';
import { EmailsendComponent } from './emailsend/emailsend.component'
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TMProfileComponent } from "./tm-profile/tm-profile.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { SubjectsComponent } from "./subjects/subjects.component";
import { LocationsComponent } from "./locations/locations.component";
import { TmanagersComponent } from "./tmanagers/tmanagers.component";
import { AuthGuard } from "./gaurds/auth.gaurd";
import { TutorComponent } from './tutor/tutor.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'changepassword', canActivate: [AuthGuard], component: ChangePasswordComponent },
  { path: 'header', canActivate: [AuthGuard], component: HeaderComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'emailsend', canActivate: [AuthGuard], component: EmailsendComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'tmprofile/:id', canActivate: [AuthGuard], component: TMProfileComponent },
  { path: 'adminprofile', canActivate: [AuthGuard], component: AdminProfileComponent },
  { path: 'subject', canActivate: [AuthGuard], component: SubjectsComponent },
  { path: 'location', canActivate: [AuthGuard], component: LocationsComponent },
  { path: 'managers', canActivate: [AuthGuard], component: TmanagersComponent },
  { path: 'tutor/:id', canActivate: [AuthGuard], component: TutorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
