import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bEditPurchasedFundsComponent } from './b2b-edit-purchased-funds.component';

describe('B2bEditPurchasedFundsComponent', () => {
  let component: B2bEditPurchasedFundsComponent;
  let fixture: ComponentFixture<B2bEditPurchasedFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bEditPurchasedFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bEditPurchasedFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
