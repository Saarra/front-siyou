import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOrderModalComponent } from './validate-order-modal.component';

describe('ValidateOrderModalComponent', () => {
  let component: ValidateOrderModalComponent;
  let fixture: ComponentFixture<ValidateOrderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateOrderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
