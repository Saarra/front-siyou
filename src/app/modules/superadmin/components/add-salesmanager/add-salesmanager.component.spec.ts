import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesmanagerComponent } from './add-salesmanager.component';

describe('AddSalesmanagerComponent', () => {
  let component: AddSalesmanagerComponent;
  let fixture: ComponentFixture<AddSalesmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
