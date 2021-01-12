import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidOrdersComponent } from './paid-orders.component';

describe('PaidOrdersComponent', () => {
  let component: PaidOrdersComponent;
  let fixture: ComponentFixture<PaidOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
