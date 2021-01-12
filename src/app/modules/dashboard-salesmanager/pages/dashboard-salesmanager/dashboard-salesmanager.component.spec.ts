import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesmanagerComponent } from './dashboard-salesmanager.component';

describe('DashboardSalesmanagerComponent', () => {
  let component: DashboardSalesmanagerComponent;
  let fixture: ComponentFixture<DashboardSalesmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSalesmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSalesmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
