import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bPaymentMethodsComponent } from './b2b-payment-methods.component';

describe('B2bPaymentMethodsComponent', () => {
  let component: B2bPaymentMethodsComponent;
  let fixture: ComponentFixture<B2bPaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bPaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
