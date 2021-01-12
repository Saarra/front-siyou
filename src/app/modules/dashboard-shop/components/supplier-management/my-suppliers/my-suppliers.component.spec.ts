import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySuppliersComponent } from './my-suppliers.component';

describe('MySuppliersComponent', () => {
  let component: MySuppliersComponent;
  let fixture: ComponentFixture<MySuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
