import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  // private execludeUrls: string[] = [
  //   '/login',
  //   '/logout',
  //   '/register',
  // ];

  constructor(
    private loadingService: LoaderService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Kiểm tra xem có nên show loading cho request này không
    // const shouldShowLoading = !this.isExcludedUrl(request.url);

    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );

  }

  // isExcludedUrl(url: string): boolean {
  //   return this.execludeUrls.some(excludedUrl => url.includes(excludedUrl));
  // }
};
