import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bAddPurchasedFundsComponent } from './b2b-add-purchased-funds.component';

describe('B2bAddPurchasedFundsComponent', () => {
  let component: B2bAddPurchasedFundsComponent;
  let fixture: ComponentFixture<B2bAddPurchasedFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bAddPurchasedFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bAddPurchasedFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
