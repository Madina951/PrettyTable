import { Injectable } from '@angular/core';
import { FieldOrder, Paging, TableController, TableRow } from './table-controller';
import { BehaviorSubject, Observable, combineLatest, debounceTime, switchMap, tap } from 'rxjs';

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
    return this.rows$$.asObservable();
  }

  init$(): Observable<any> {
    return this.loadTable$();
  }

  private loadTable$(): Observable<any> {
    return combineLatest([this.search$$, this.sort$$, this.paging$$]).pipe(
      switchMap(([search, sort, paging]) => this.controller.loadTable$({
        search,
        paging,
        order: sort
      })),
      tap((table) => this.rows$$.next(table.rows))
    );
  }
  
  getDefaultOrder(): FieldOrder {
    return {
      field: 'id',
      order: 'ASC'
    };
  }

  getDefaultPaging(): Paging {
    return {
      limit: 10,
      offset: 0
    };
  }
}
