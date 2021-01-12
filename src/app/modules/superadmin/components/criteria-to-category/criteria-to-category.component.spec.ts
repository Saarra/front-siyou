import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaToCategoryComponent } from './criteria-to-category.component';

describe('CriteriaToCategoryComponent', () => {
  let component: CriteriaToCategoryComponent;
  let fixture: ComponentFixture<CriteriaToCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaToCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
