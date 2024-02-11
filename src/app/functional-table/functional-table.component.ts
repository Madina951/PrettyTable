import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableService } from './table.service';
import { Columns, FieldOrder, Paging, TableRow } from '../services/table-controller';
import { Observable, combineLatest, defer, map, tap } from 'rxjs';

@Component({
  selector: 'app-functional-table',
  templateUrl: './functional-table.component.html',
  styleUrl: './functional-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableService]
})
export class FunctionalTableComponent {

  rows$: Observable<TableRow[]> = defer(() => this.tableService.rows$);
  rowsCount$: Observable<number> = defer(()=> this.tableService.totalCount$);
  headers$: Observable<string[]> = defer(() => this.tableService.rows$.pipe(
    map(rows => Object.keys(rows[0])),
    tap(headers => { if(Object.keys(this.columns).length === 0) this.columns = ({...this.arrayToObject(headers), [this.allKey]: true})})
    ));
  paging$: Observable<Paging> = defer(() => this.tableService.paging$);
  activePage$: Observable<number> = defer(() => this.tableService.paging$.pipe(map(p => p.page)));
  search$: Observable<string> = defer(() => this.tableService.search$);
  sort$: Observable<FieldOrder> = defer(() => this.tableService.sort$);
  init$: Observable<any> = defer(() => this.tableService.init$());

  pages$: Observable<number[]> = defer(() => combineLatest([this.tableService.totalCount$, this.paging$]).pipe(
    map(([count, paging]) => {
      this.pageCount = Math.ceil(count/paging.limit);
      return Array.from({length: this.pageCount}, (_, i) => i + 1);
    })
  ));

  public numbers: number[] = [10, 15, 30, 45, 60];
  public columns: Columns = {};
  public pageCount: number = 0;
  private allKey: string = "_All";

  constructor(
    private tableService: TableService
  ) {}

  arrayToObject(arr: any[]): { [key: string]: boolean } {
    const obj: { [key: string]: boolean } = {};
    arr.forEach((item) => {
        obj[item] = true;
    });
    return obj;
  }

  changedColumns(key: string, value: boolean) {
    if (key === this.allKey) {
      return Object.keys(this.columns).forEach(key => this.columns[key] = value);
    }

    if (!value) {
      this.columns[this.allKey] = false;
    }

    this.columns[key] = value;
  }

  setSearch(value: string) {
    this.tableService.setSearch(value);
  }

  setPaging(event: any) {
    this.tableService.setPaging(event.target.value);
  }

  setPage(page: number) {
    this.tableService.setPage(page);
  }

  setPreviousPage() {
    this.tableService.setPreviosPage();
  }

  setNextPage() {
    this.tableService.setNextPage();
  }
  
  setSort(field: string) {
    this.tableService.setSort(field);
  }
}
