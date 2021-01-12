import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidMembersListComponent } from './invalid-members-list.component';

describe('InvalidMembersListComponent', () => {
  let component: InvalidMembersListComponent;
  let fixture: ComponentFixture<InvalidMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
