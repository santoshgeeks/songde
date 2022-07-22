import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    cound=0
    constructor() { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(<any>sessionStorage.getItem("user"))
        if (currentUser && currentUser.result.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${currentUser.result.token}`
                }
            });
        }

        return next.handle(request);
    }
}