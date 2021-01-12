import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSalesStatisticsComponent } from './shop-sales-statistics.component';

describe('ShopSalesStatisticsComponent', () => {
  let component: ShopSalesStatisticsComponent;
  let fixture: ComponentFixture<ShopSalesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSalesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSalesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
