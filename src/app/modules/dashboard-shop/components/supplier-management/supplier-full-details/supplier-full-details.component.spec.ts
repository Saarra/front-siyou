import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFullDetailsComponent } from './supplier-full-details.component';

describe('SupplierFullDetailsComponent', () => {
  let component: SupplierFullDetailsComponent;
  let fixture: ComponentFixture<SupplierFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
