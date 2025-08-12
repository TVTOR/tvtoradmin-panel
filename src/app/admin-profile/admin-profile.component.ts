import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  public admindata
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.onSubmit()
  }

  onSubmit(): void {

    var currentUser = JSON.parse(localStorage.getItem('admin'));
    var id = currentUser.id
    this.authenticationService.getSingleTutor(id).subscribe((res) => {
      this.admindata = res.data

    }
    );

  }

}
