import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInvalidOrdersComponent } from './shop-invalid-orders.component';

describe('ShopInvalidOrdersComponent', () => {
  let component: ShopInvalidOrdersComponent;
  let fixture: ComponentFixture<ShopInvalidOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInvalidOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInvalidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
