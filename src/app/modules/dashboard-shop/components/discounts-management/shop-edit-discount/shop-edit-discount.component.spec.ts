import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditDiscountComponent } from './shop-edit-discount.component';

describe('ShopEditDiscountComponent', () => {
  let component: ShopEditDiscountComponent;
  let fixture: ComponentFixture<ShopEditDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
