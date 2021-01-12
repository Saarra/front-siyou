import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAccountsComponent } from './valid-accounts.component';

describe('ValidAccountsComponent', () => {
  let component: ValidAccountsComponent;
  let fixture: ComponentFixture<ValidAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
