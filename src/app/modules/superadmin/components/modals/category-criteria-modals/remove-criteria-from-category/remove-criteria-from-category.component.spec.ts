import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCriteriaFromCategoryComponent } from './remove-criteria-from-category.component';

describe('RemoveCriteriaFromCategoryComponent', () => {
  let component: RemoveCriteriaFromCategoryComponent;
  let fixture: ComponentFixture<RemoveCriteriaFromCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveCriteriaFromCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCriteriaFromCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
