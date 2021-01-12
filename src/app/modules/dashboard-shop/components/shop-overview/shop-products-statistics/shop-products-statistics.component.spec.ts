import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductsStatisticsComponent } from './shop-products-statistics.component';

describe('ShopProductsStatisticsComponent', () => {
  let component: ShopProductsStatisticsComponent;
  let fixture: ComponentFixture<ShopProductsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopProductsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopProductsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
