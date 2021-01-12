import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFundsStatisticsComponent } from './shop-funds-statistics.component';

describe('ShopFundsStatisticsComponent', () => {
  let component: ShopFundsStatisticsComponent;
  let fixture: ComponentFixture<ShopFundsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFundsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFundsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
