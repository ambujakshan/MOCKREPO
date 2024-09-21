import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole();
      const url: string = state.url; // Get the current URL

      // Check if the URL is '/admin' and the user role is 'admin'
      if (url.includes('/admin') && userRole === 'admin') {
        return true; // Allow access for admins

      // Check if the URL is for an employee route and the role is 'employee'
      } else if (url.includes('/employee') && userRole === 'employee') {
        return true; // Allow access for employees

      } else {
        this.router.navigate(['/login']); // Redirect to login if role doesn't match the URL
        return false;
      }      

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
