import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrandModalComponent } from './edit-brand-modal.component';

describe('EditBrandModalComponent', () => {
  let component: EditBrandModalComponent;
  let fixture: ComponentFixture<EditBrandModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBrandModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
