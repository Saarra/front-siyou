import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopValidOrdersComponent } from './shop-valid-orders.component';

describe('ShopValidOrdersComponent', () => {
  let component: ShopValidOrdersComponent;
  let fixture: ComponentFixture<ShopValidOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopValidOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopValidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
