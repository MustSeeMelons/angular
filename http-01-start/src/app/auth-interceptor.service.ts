import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const mRequst = req.clone({
      headers: req.headers.append("c", "c"),
    });

    return next.handle(mRequst).pipe(
      tap((event) => {
        // console.log(event);
      })
    );
  }
}
