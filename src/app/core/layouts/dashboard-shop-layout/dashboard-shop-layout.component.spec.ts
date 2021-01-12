import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShopLayoutComponent } from './dashboard-shop-layout.component';

describe('DashboardShopLayoutComponent', () => {
  let component: DashboardShopLayoutComponent;
  let fixture: ComponentFixture<DashboardShopLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardShopLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShopLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
