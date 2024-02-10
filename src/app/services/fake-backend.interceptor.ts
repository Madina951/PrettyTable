import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap, tap } from "rxjs";
import { FakeBackend } from "./fake-backend";


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(
        private fakeBackend: FakeBackend
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.startsWith('api/table')) {

            console.log("interceptor works!")
            return next.handle(req);
        }
        return next.handle(req);
    }
}