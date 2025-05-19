import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const hasToken = getCookie('myapptoken');

  if (hasToken) {
    return true;
  } else {
    console.error("Guarded route: Unauthorized");
    router.navigate([routeNames.login.path]);
    return false;
  }
};

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { routeNames } from './app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const hasToken = this.getCookie('myapptoken');

    if (hasToken) {
      return true;
    } else {
      this.router.navigate([routeNames.login.path]); // Redirect to login if not authenticated
      return false;
    }
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}
