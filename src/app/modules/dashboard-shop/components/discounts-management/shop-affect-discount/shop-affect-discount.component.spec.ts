import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAffectDiscountComponent } from './shop-affect-discount.component';

describe('ShopAffectDiscountComponent', () => {
  let component: ShopAffectDiscountComponent;
  let fixture: ComponentFixture<ShopAffectDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAffectDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAffectDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
