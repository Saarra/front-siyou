import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommissionPercentModalComponent } from './update-commission-percent-modal.component';

describe('UpdateCommissionPercentModalComponent', () => {
  let component: UpdateCommissionPercentModalComponent;
  let fixture: ComponentFixture<UpdateCommissionPercentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCommissionPercentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommissionPercentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
