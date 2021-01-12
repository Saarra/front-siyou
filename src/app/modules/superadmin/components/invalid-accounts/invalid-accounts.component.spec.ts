import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidAccountsComponent } from './invalid-accounts.component';

describe('InvalidAccountsComponent', () => {
  let component: InvalidAccountsComponent;
  let fixture: ComponentFixture<InvalidAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
