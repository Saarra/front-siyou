import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAccountManagementComponent } from './supplier-account-management.component';

describe('SupplierAccountManagementComponent', () => {
  let component: SupplierAccountManagementComponent;
  let fixture: ComponentFixture<SupplierAccountManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAccountManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
