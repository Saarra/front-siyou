import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSalesFundsComponent } from './b2b-sales-funds.component';

describe('B2bSalesFundsComponent', () => {
  let component: B2bSalesFundsComponent;
  let fixture: ComponentFixture<B2bSalesFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSalesFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSalesFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
