import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bWarehouseManagementComponent } from './b2b-warehouse-management.component';

describe('B2bWarehouseManagementComponent', () => {
  let component: B2bWarehouseManagementComponent;
  let fixture: ComponentFixture<B2bWarehouseManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bWarehouseManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bWarehouseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
