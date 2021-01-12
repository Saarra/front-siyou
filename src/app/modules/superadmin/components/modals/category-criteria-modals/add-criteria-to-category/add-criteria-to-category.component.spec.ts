import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriteriaToCategoryComponent } from './add-criteria-to-category.component';

describe('AddCriteriaToCategoryComponent', () => {
  let component: AddCriteriaToCategoryComponent;
  let fixture: ComponentFixture<AddCriteriaToCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCriteriaToCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriteriaToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
