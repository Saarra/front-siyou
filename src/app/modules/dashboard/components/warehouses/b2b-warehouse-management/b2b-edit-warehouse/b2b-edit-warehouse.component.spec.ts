import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bEditWarehouseComponent } from './b2b-edit-warehouse.component';

describe('B2bEditWarehouseComponent', () => {
  let component: B2bEditWarehouseComponent;
  let fixture: ComponentFixture<B2bEditWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bEditWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bEditWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
