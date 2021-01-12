import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditPaymentMethodComponent } from './shop-edit-payment-method.component';

describe('ShopEditPaymentMethodComponent', () => {
  let component: ShopEditPaymentMethodComponent;
  let fixture: ComponentFixture<ShopEditPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
