import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../storage/storage.service'; // corect path

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = StorageService.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
