import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFullDetailsComponent } from './order-full-details.component';

describe('OrderFullDetailsComponent', () => {
  let component: OrderFullDetailsComponent;
  let fixture: ComponentFixture<OrderFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
