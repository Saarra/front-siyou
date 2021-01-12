import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bAddWarehouseComponent } from './b2b-add-warehouse.component';

describe('B2bAddWarehouseComponent', () => {
  let component: B2bAddWarehouseComponent;
  let fixture: ComponentFixture<B2bAddWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bAddWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bAddWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
