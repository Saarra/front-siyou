import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidOrdersComponent } from './valid-orders.component';

describe('ValidOrdersComponent', () => {
  let component: ValidOrdersComponent;
  let fixture: ComponentFixture<ValidOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
