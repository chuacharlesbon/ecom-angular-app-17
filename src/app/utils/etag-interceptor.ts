import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, of, tap } from 'rxjs';
  
  interface CachedResponse {
    etag: string;
    response: HttpResponse<any>;
  }
  
  @Injectable()
  export class ETagInterceptor implements HttpInterceptor {
    private cache = new Map<string, CachedResponse>();
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Only cache GET requests
      if (req.method !== 'GET') {
        return next.handle(req);
      }
  
      const cached = this.cache.get(req.urlWithParams);
  
      if (cached) {
        // Clone request with If-None-Match header
        const conditionalReq = req.clone({
          setHeaders: { 'If-None-Match': cached.etag },
        });
  
        return next.handle(conditionalReq).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              if (event.status === 200 && event.headers.has('ETag')) {
                this.cache.set(req.urlWithParams, {
                  etag: event.headers.get('ETag')!,
                  response: event,
                });
              } else if (event.status === 304) {
                return of(cached.response);
              }
              return;
            }
            return;
          })
        );
      }
  
      // No cache, proceed normally
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse && event.headers.has('ETag')) {
            this.cache.set(req.urlWithParams, {
              etag: event.headers.get('ETag')!,
              response: event,
            });
          }
        })
      );
    }
  }
  