import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bInventoryManagementComponent } from './b2b-inventory-management.component';

describe('B2bInventoryManagementComponent', () => {
  let component: B2bInventoryManagementComponent;
  let fixture: ComponentFixture<B2bInventoryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bInventoryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bInventoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
