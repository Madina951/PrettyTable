import { Table, TableRequest, TableRow } from "./table-controller";
import data from '../../assets/data';
import { Observable, of } from "rxjs";

export class FakeBackend {
    rows: TableRow[] = data;

    loadTable$(request: TableRequest): Observable<Table> {
        return of({rows: this.rows, total: this.rows.length});
    }
}