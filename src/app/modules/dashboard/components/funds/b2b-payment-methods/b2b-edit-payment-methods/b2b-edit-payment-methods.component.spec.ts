import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bEditPaymentMethodsComponent } from './b2b-edit-payment-methods.component';

describe('B2bEditPaymentMethodsComponent', () => {
  let component: B2bEditPaymentMethodsComponent;
  let fixture: ComponentFixture<B2bEditPaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bEditPaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bEditPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
