import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPurshasedProductsComponent } from './shop-purshased-products.component';

describe('ShopPurshasedProductsComponent', () => {
  let component: ShopPurshasedProductsComponent;
  let fixture: ComponentFixture<ShopPurshasedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPurshasedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPurshasedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
