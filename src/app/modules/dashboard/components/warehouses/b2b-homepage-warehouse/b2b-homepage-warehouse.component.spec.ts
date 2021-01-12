import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bHomepageWarehouseComponent } from './b2b-homepage-warehouse.component';

describe('B2bHomepageWarehouseComponent', () => {
  let component: B2bHomepageWarehouseComponent;
  let fixture: ComponentFixture<B2bHomepageWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bHomepageWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bHomepageWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
