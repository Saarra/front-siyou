import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsManagementComponent } from './brands-management.component';

describe('BrandsManagementComponent', () => {
  let component: BrandsManagementComponent;
  let fixture: ComponentFixture<BrandsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
