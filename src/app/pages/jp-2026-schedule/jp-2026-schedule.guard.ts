import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const ACCESS_KEY = '1204';

export const jp2026ScheduleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const key = route.queryParamMap.get('key');

  if (key === ACCESS_KEY) {
    return true;
  }

  return router.createUrlTree(['/']);
};
