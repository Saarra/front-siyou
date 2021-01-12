import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAffectPromotionComponent } from './shop-affect-promotion.component';

describe('ShopAffectPromotionComponent', () => {
  let component: ShopAffectPromotionComponent;
  let fixture: ComponentFixture<ShopAffectPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAffectPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAffectPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
