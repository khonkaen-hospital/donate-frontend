import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCashFilterComponent } from './find-cash-filter.component';

describe('FindCashFilterComponent', () => {
  let component: FindCashFilterComponent;
  let fixture: ComponentFixture<FindCashFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCashFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCashFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
