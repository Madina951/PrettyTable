import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";

export type Order = 'ASC' | 'DESC';

export type FieldOrder = {
    field: string;
    order: Order;
}

export type Paging = {
    limit: number;
    page: number;
}

export type TableRequest = {
    search: string;
    paging: Paging;
    order: FieldOrder;
}

export type TableRow = {
    _id: string,
    isActive: boolean,
    balance: string,
    picture: string,
    age: number,
    name: {
        first: string,
        last: string,
    },
    company: string,
    email: string,
    address: string,
    tags: string[],
    favoriteFruit: string, 
}

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
        private http: HttpService
    ) {}

    loadTable$(request: TableRequest): Observable<Table> {
        const params = {
            search: request.search,
            paging: JSON.stringify(request.paging),
            order: JSON.stringify(request.order)
        }
        return this.http.get<Table>('/api/table', params);
    }
}