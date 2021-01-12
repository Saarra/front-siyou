import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrdersStatisticsComponent } from './shop-orders-statistics.component';

describe('ShopOrdersStatisticsComponent', () => {
  let component: ShopOrdersStatisticsComponent;
  let fixture: ComponentFixture<ShopOrdersStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOrdersStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrdersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
