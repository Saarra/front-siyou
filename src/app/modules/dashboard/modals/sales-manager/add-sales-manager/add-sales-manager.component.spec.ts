import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesManagerComponent } from './add-sales-manager.component';

describe('AddSalesManagerComponent', () => {
  let component: AddSalesManagerComponent;
  let fixture: ComponentFixture<AddSalesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
