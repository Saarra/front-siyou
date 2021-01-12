import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesManagerComponent } from './edit-sales-manager.component';

describe('EditSalesManagerComponent', () => {
  let component: EditSalesManagerComponent;
  let fixture: ComponentFixture<EditSalesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
