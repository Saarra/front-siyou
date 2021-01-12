import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyCategoryComponent } from './edit-my-category.component';

describe('EditMyCategoryComponent', () => {
  let component: EditMyCategoryComponent;
  let fixture: ComponentFixture<EditMyCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
