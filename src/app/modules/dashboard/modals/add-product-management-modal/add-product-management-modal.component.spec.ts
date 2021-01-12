import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductManagementModalComponent } from './add-product-management-modal.component';

describe('AddProductManagementModalComponent', () => {
  let component: AddProductManagementModalComponent;
  let fixture: ComponentFixture<AddProductManagementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductManagementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
