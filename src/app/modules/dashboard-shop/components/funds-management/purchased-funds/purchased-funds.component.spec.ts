import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedFundsComponent } from './purchased-funds.component';

describe('PurchasedFundsComponent', () => {
  let component: PurchasedFundsComponent;
  let fixture: ComponentFixture<PurchasedFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
