import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDiscountsComponent } from './history-discounts.component';

describe('HistoryDiscountsComponent', () => {
  let component: HistoryDiscountsComponent;
  let fixture: ComponentFixture<HistoryDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
