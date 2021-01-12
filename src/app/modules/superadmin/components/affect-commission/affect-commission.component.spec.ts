import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectCommissionComponent } from './affect-commission.component';

describe('AffectCommissionComponent', () => {
  let component: AffectCommissionComponent;
  let fixture: ComponentFixture<AffectCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
