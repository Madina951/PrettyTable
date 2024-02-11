import { Injectable } from '@angular/core';
import { FieldOrder, Paging, TableController, TableRow } from '../services/table-controller';
import { BehaviorSubject, Observable, combineLatest, debounceTime, shareReplay, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private controller: TableController
  ) { }

  private search$$ = new BehaviorSubject<string>('');
  private sort$$ = new BehaviorSubject<FieldOrder>(this.getDefaultOrder());
  private paging$$ = new BehaviorSubject<Paging>(this.getDefaultPaging());
  private rows$$ = new BehaviorSubject<TableRow[]>([]);
  private totalCount$$ = new BehaviorSubject<number>(0);

  get search$() {
    return this.search$$.asObservable().pipe(debounceTime(500));
  }

  get sort$() {
    return this.sort$$.asObservable();
  }

  get paging$() {
    return this.paging$$.asObservable();
  }

  get rows$() {
    return this.rows$$.asObservable().pipe(shareReplay());
  }

  get totalCount$() {
    return this.totalCount$$.asObservable().pipe(shareReplay());
  }

  init$(): Observable<any> {
    return this.loadTable$();
  }

  setSearch(value: string) {
    this.search$$.next(value);
  }

  setPaging(value: number) {
    this.paging$$.next({limit: value, page: 1});
  }

  setPage(page: number) {
    const limit = this.paging$$.getValue().limit;
    this.paging$$.next({limit, page});
  }

  setPreviosPage() {
    const previosPage = this.paging$$.getValue().page - 1;
    const limit = this.paging$$.getValue().limit;
    this.paging$$.next({limit, page: previosPage});
  }

  setNextPage() {
    const previosPage = this.paging$$.getValue().page + 1;
    const limit = this.paging$$.getValue().limit;
    this.paging$$.next({limit, page: previosPage});
  }

  setSort(field: string) {
    const currentField = this.sort$$.getValue().field;
    currentField === field ? this.sort$$.next({field, order: 'DESC'}) : this.sort$$.next({field, order: 'ASC'});
  }

  private loadTable$(): Observable<any> {
    return combineLatest([this.search$$, this.sort$$, this.paging$$]).pipe(
      switchMap(([search, sort, paging]) => this.controller.loadTable$({
        search,
        paging,
        order: sort
      })),
      tap((table) => (this.rows$$.next(table.rows), this.totalCount$$.next(table.total)))
    );
  }
  
  getDefaultOrder(): FieldOrder {
    return {
      field: '_id',
      order: 'ASC'
    };
  }

  getDefaultPaging(): Paging {
    return {
      limit: 10,
      page: 1
    };
  }
}
