import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierSystemComponent } from './add-supplier-system.component';

describe('AddSupplierSystemComponent', () => {
  let component: AddSupplierSystemComponent;
  let fixture: ComponentFixture<AddSupplierSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
