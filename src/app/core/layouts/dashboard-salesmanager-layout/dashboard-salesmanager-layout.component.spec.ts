import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesmanagerLayoutComponent } from './dashboard-salesmanager-layout.component';

describe('DashboardSalesmanagerLayoutComponent', () => {
  let component: DashboardSalesmanagerLayoutComponent;
  let fixture: ComponentFixture<DashboardSalesmanagerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSalesmanagerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSalesmanagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
