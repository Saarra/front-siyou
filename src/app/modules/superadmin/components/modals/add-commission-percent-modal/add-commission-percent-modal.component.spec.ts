import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommissionPercentModalComponent } from './add-commission-percent-modal.component';

describe('AddCommissionPercentModalComponent', () => {
  let component: AddCommissionPercentModalComponent;
  let fixture: ComponentFixture<AddCommissionPercentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommissionPercentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommissionPercentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
