import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { FakeBackend } from "./fake-backend";

export type Order = 'ASC' | 'DESC';

export type FieldOrder = {
    field: string;
    order: Order;
}

export type Paging = {
    limit: number;
    offset: number;
}

export type TableRequest = {
    search: string;
    paging: Paging;
    order: FieldOrder;
}

export type TableRow = {}

export type Table = {
    total: number;
    rows: TableRow[];
}

export type Columns = {
    [keys: string]: boolean
}

@Injectable({providedIn: 'root'})
export class TableController {
    constructor(
        private http: HttpService,
        private fakeHttp: FakeBackend
    ) {}

    loadTable$(request: TableRequest): Observable<Table> {
        return this.fakeHttp.loadTable$(request);
        // return this.http.get<Table>('/api/table', request);
    }
}