import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { filter, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {

    const allowedRoles: string[] = next.data.roles ?? [];

    return this.authService.authenticationState.pipe(
      filter(val => val !== null),
      take(1),
      map(role => {
        if (allowedRoles.indexOf(role) !== -1) {
          return true;
        }
        else { 
          if (role === 'admin') { 
            this.router.navigate(['/feed']);
          } 
          else if (role === 'user'){
            this.router.navigate(['/feed']);
          }
          else { 
            this.router.navigate(['/login']);
          }
          return false;
        }
      })
    );
  }
  
}
