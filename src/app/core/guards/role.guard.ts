import { inject } from '@angular/core';

import {ActivatedRouteSnapshot,CanActivateFn,Router} from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'];

  if (authService.currentUser()?.role === requiredRole) {
    return true;
  }
  return router.createUrlTree([
    '/dashboard'
  ]);
};