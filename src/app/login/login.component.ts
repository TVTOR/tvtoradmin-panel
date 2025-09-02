import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private _storageService: StorageService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('admin'));
    if (loggedInUser && loggedInUser.token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.submitted = true;
    //stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      const formVal = this.loginForm.value;
      const data = {
        email: formVal.email,
        password: formVal.password
      };
      this.authenticationService.loginUser(data).subscribe(
        res => {
          if (res && res.body.success == true) {
            this._storageService.setItem('admin', JSON.stringify({
              token: res.body.data.token,
              id: res.body.data._id,
              email: res.body.data.email,
              name: res.body.data.name,
              surname: res.body.data.surname,
              userType: res.body.data.userType
            }));
            this.toastr.success(res.message, 'Login successfully!', { progressBar: true });
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toastr.error(res.body.message || 'Login failed', 'Login Error', { progressBar: true });
          }
        }, err => {
          this.toastr.error(err.error?.message || err.message || 'Network error occurred', 'Connection Error', { progressBar: true });
        }
      );
    }
  }

}

