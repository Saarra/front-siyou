import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShopComponent } from './dashboard-shop.component';

describe('DashboardShopComponent', () => {
  let component: DashboardShopComponent;
  let fixture: ComponentFixture<DashboardShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
