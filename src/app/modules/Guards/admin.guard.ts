import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);
  
  if (adminService.isAuth()) {
    return true
  } else {
    router.navigateByUrl('/admin/login')
    return false
  }
};
