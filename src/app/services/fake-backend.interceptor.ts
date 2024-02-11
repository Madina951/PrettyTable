import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap, tap } from "rxjs";
import { FakeBackend } from "./fake-backend";
import { TableRequest } from "./table-controller";


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private fakeBackend = new FakeBackend();

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.endsWith('api/table')) {
            return this.fakeBackend.loadTable$({
                search: req.params.get('search'),
                paging: JSON.parse(req.params.get('paging')),
                order: JSON.parse(req.params.get('order'))
            });
        }
        return next.handle(req);
    }
}