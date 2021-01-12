import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bPreOrderComponent } from './b2b-pre-order.component';

describe('B2bPreOrderComponent', () => {
  let component: B2bPreOrderComponent;
  let fixture: ComponentFixture<B2bPreOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bPreOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bPreOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
