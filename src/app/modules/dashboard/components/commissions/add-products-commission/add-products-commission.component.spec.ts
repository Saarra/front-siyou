import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsCommissionComponent } from './add-products-commission.component';

describe('AddProductsCommissionComponent', () => {
  let component: AddProductsCommissionComponent;
  let fixture: ComponentFixture<AddProductsCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
