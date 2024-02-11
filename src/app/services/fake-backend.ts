import { Table, TableRequest, TableRow } from "./table-controller";
import data from '../../assets/data';
import { Observable, map, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";

export class FakeBackend {
    rows: TableRow[] = data as TableRow[];

    loadTable$(request: TableRequest): Observable<HttpResponse<Table>> {
        const resp = this.rows
            .filter(row => row.tags.some(tag => tag.indexOf(request.search) > -1))
            .sort((a, b) => {
                const field: string = request.order.field;
                return request.order.order === 'ASC' ? this.sortByAsc(a, b, field) : this.sortByDesc(a, b, field);
            })
            .slice(request.paging.limit * (request.paging.page - 1),request.paging.limit * request.paging.page);

        return of({rows: resp, total: this.rows.length}).pipe(
            map(table => this.wrapInHttpResponse(table))
        );
    }

    wrapInHttpResponse(table: Table): HttpResponse<Table> {
        return new HttpResponse<Table>({body: table});
    }

    sortByAsc(a: TableRow, b: TableRow, field: string){
        if (a?.[field as keyof TableRow] < b?.[field as keyof TableRow]) {
            return -1
        } else if (a?.[field as keyof TableRow] == b?.[field as keyof TableRow]) {
            return 0;
        } else {
            return 1;
        }
    }

    sortByDesc(a: TableRow, b: TableRow, field: string){
        if (a?.[field as keyof TableRow] > b?.[field as keyof TableRow]) {
            return -1
        } else if (a?.[field as keyof TableRow] == b?.[field as keyof TableRow]) {
            return 0;
        } else {
            return 1;
        }
    }
}