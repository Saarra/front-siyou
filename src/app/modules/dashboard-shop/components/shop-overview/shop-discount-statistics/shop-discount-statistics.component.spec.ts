import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDiscountStatisticsComponent } from './shop-discount-statistics.component';

describe('ShopDiscountStatisticsComponent', () => {
  let component: ShopDiscountStatisticsComponent;
  let fixture: ComponentFixture<ShopDiscountStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDiscountStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDiscountStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
