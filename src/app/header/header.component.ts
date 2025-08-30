import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    var currentUser = JSON.parse(localStorage.getItem('admin'));
    
    // Check for both 'id' and '_id' properties since the localStorage might use either
    const userId = currentUser.id || currentUser._id;
    
    if (currentUser && userId && currentUser.token) {
      // Call the backend logout API
      this.authenticationService.userLogout(userId).subscribe(
        (response) => {
          // Clear localStorage after successful API call
          localStorage.removeItem('admin');
          // Navigate to login page after successful logout
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Logout error:', error);
          // Clear localStorage even if API call fails
          localStorage.removeItem('admin');
          // Navigate to login page even if logout API fails
          this.router.navigate(['/login']);
        }
      );
    } else {
      // If no user data, just clear localStorage
      localStorage.removeItem('admin');
      // Navigate to login page
      this.router.navigate(['/login']);
    }
  }
}
