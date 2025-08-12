import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
// import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emailsend',
  templateUrl: './emailsend.component.html',
  styleUrls: ['./emailsend.component.css']
})
export class EmailsendComponent implements OnInit {
  emailForm: FormGroup;
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
    this.emailForm = this.fb.group({
      email: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const formVal = this.emailForm.value;
    const data = {
      email: formVal.email,
    };
    this.authenticationService.emailSend(data).subscribe(
      res => {
        this.router.navigateByUrl('/login');
      }, err => {
        this.toastr.error(err.message, 'Failure!', { progressBar: true });
      }
    );

  }

}

