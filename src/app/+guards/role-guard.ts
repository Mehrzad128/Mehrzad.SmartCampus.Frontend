import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../+services/auth-service/auth-service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles: string[] = route.data['allowedRoles'] ?? [];

    return this.auth.validateToken().pipe(
      map(result => {
        if (!result.isOK) {
          this.auth.clearToken();
          return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        }

        if (allowedRoles.length === 0 || (result.role && allowedRoles.includes(result.role))) {
          return true;
        }
        //add 404 page if you want
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}