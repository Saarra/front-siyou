import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bPurchasedFundsComponent } from './b2b-purchased-funds.component';

describe('B2bPurchasedFundsComponent', () => {
  let component: B2bPurchasedFundsComponent;
  let fixture: ComponentFixture<B2bPurchasedFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bPurchasedFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bPurchasedFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
