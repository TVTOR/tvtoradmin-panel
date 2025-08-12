import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailsendComponent } from './emailsend/emailsend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TMProfileComponent } from './tm-profile/tm-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { LocationsComponent } from './locations/locations.component';
import { TmanagersComponent } from './tmanagers/tmanagers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { AuthGuard } from './gaurds/auth.gaurd';
import { TutorComponent } from './tutor/tutor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    HeaderComponent,
    UsersComponent,
    EmailsendComponent,
    DashboardComponent,
    SidebarComponent,
    TMProfileComponent,
    AdminProfileComponent,
    SubjectsComponent,
    LocationsComponent,
    TmanagersComponent,
    TutorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ColorPickerModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
