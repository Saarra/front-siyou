import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanagerComponent } from './salesmanager.component';

describe('SalesmanagerComponent', () => {
  let component: SalesmanagerComponent;
  let fixture: ComponentFixture<SalesmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
