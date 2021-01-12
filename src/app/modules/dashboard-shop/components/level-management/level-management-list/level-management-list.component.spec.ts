import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelManagementListComponent } from './level-management-list.component';

describe('LevelManagementListComponent', () => {
  let component: LevelManagementListComponent;
  let fixture: ComponentFixture<LevelManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
