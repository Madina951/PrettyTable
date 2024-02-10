import { Component } from '@angular/core';
import { TableService } from '../services/table.service';
import { FakeBackend } from '../services/fake-backend';
import { Columns } from '../services/table-controller';

@Component({
  selector: 'app-functional-table',
  templateUrl: './functional-table.component.html',
  styleUrl: './functional-table.component.scss'
})
export class FunctionalTableComponent {
  
  public rows: any;
  public paging: any;
  public search: any = '';
  public sort: any;
  public headers: any;
  public numbers: number[] = [10, 15, 30, 45, 60];
  public columns: Columns = {};

  constructor(
    private tableService: TableService,
    private fakeBackend: FakeBackend
  ) {}

  ngOnInit() {
    this.tableService.init$().subscribe();
    this.tableService.rows$.subscribe(val => {
      this.rows = val;
      this.headers = Object.keys(this.rows[0]);
      Object.assign(this.columns, this.arrayToObject(this.headers), {_All: true});
    } );
    this.tableService.paging$.subscribe(val => this.paging = val);
    this.tableService.search$.subscribe(val => this.search = val);
    this.tableService.sort$.subscribe(val => this.sort = val);


  }

  arrayToObject(arr: any[]): { [key: string]: boolean } {
    const obj: { [key: string]: boolean } = {};
    arr.forEach((item) => {
        obj[item] = true;
    });
    return obj;
  }

  changedColumns(key: string, value: Event) {
    if (key == "_All") {
      if (value) {
        for (let key in this.columns) {
          this.columns[key] = true;
        }
      } else {
        for (let key in this.columns) {
          this.columns[key] = false;
        }
      }
    } else {
      if (!value && this.columns["_All"]) {
        this.columns["_All"] = false;
      }
    }
  }

  
}
