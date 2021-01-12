import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLevelComponent } from './add-new-level.component';

describe('AddNewLevelComponent', () => {
  let component: AddNewLevelComponent;
  let fixture: ComponentFixture<AddNewLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
