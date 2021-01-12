import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminPageComponent } from './superadmin-page.component';

describe('SuperadminPageComponent', () => {
  let component: SuperadminPageComponent;
  let fixture: ComponentFixture<SuperadminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
