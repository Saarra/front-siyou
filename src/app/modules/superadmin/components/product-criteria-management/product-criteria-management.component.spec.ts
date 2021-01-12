import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCriteriaManagementComponent } from './product-criteria-management.component';

describe('ProductCriteriaManagementComponent', () => {
  let component: ProductCriteriaManagementComponent;
  let fixture: ComponentFixture<ProductCriteriaManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCriteriaManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCriteriaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
