import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const loggedInUser = JSON.parse(localStorage.getItem('admin'));
      if (!loggedInUser) {
         this.router.navigate(['login']);
         return false;
      } else {
         if (state.url === "/") {
            this.router.navigate(['home']);
            return true;
         } else {
            return true;
         }
      }

   }
}