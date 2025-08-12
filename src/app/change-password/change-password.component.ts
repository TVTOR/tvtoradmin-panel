import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
// import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      resetPassword: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.submitted = true;
    //stop here if form is invalid

    const formVal = this.changePasswordForm.value;
    const data = {
      oldPassword: formVal.oldPassword,
      resetPassword: formVal.resetPassword
    };
    var currentUser = JSON.parse(localStorage.getItem('admin'));
    var id = currentUser.id
    this.authenticationService.resetPassword(data, id).subscribe(
      res => {

      }, err => {
        this.toastr.error(err.message, 'Failure!', { progressBar: true });
      }
    );

  }

}

