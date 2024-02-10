import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalTableComponent } from './functional-table.component';

describe('FunctionalTableComponent', () => {
  let component: FunctionalTableComponent;
  let fixture: ComponentFixture<FunctionalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionalTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
