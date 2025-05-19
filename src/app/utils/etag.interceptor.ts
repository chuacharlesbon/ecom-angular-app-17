import { HttpInterceptorFn } from '@angular/common/http';

export const etagInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
