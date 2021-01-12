import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedAccountsComponent } from './verified-accounts.component';

describe('VerifiedAccountsComponent', () => {
  let component: VerifiedAccountsComponent;
  let fixture: ComponentFixture<VerifiedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
