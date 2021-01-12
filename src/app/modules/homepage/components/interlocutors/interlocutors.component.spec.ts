import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterlocutorsComponent } from './interlocutors.component';

describe('InterlocutorsComponent', () => {
  let component: InterlocutorsComponent;
  let fixture: ComponentFixture<InterlocutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterlocutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterlocutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
