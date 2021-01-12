import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPaidOrdersComponent } from './shop-paid-orders.component';

describe('ShopPaidOrdersComponent', () => {
  let component: ShopPaidOrdersComponent;
  let fixture: ComponentFixture<ShopPaidOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPaidOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPaidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
