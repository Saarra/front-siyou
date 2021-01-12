import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectSalesManagerComponent } from './affect-sales-manager.component';

describe('AffectSalesManagerComponent', () => {
  let component: AffectSalesManagerComponent;
  let fixture: ComponentFixture<AffectSalesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectSalesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectSalesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
