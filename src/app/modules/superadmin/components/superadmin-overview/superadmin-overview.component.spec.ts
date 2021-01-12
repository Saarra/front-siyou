import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminOverviewComponent } from './superadmin-overview.component';

describe('SuperadminOverviewComponent', () => {
  let component: SuperadminOverviewComponent;
  let fixture: ComponentFixture<SuperadminOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
