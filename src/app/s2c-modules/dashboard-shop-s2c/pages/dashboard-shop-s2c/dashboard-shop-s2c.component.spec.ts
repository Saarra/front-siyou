import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShopS2cComponent } from './dashboard-shop-s2c.component';

describe('DashboardShopS2cComponent', () => {
  let component: DashboardShopS2cComponent;
  let fixture: ComponentFixture<DashboardShopS2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardShopS2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShopS2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
