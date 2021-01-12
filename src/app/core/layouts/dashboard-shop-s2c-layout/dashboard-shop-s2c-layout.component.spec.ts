import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShopS2cLayoutComponent } from './dashboard-shop-s2c-layout.component';

describe('DashboardShopS2cLayoutComponent', () => {
  let component: DashboardShopS2cLayoutComponent;
  let fixture: ComponentFixture<DashboardShopS2cLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardShopS2cLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShopS2cLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
