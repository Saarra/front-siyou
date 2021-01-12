import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bStockManagementComponent } from './b2b-stock-management.component';

describe('B2bStockManagementComponent', () => {
  let component: B2bStockManagementComponent;
  let fixture: ComponentFixture<B2bStockManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bStockManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bStockManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
