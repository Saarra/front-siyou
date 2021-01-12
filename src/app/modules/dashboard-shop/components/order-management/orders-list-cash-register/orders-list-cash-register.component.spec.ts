import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListCashRegisterComponent } from './orders-list-cash-register.component';

describe('OrdersListCashRegisterComponent', () => {
  let component: OrdersListCashRegisterComponent;
  let fixture: ComponentFixture<OrdersListCashRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListCashRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListCashRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
