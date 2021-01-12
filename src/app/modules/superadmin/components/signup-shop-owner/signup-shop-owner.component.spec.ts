import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupShopOwnerComponent } from './signup-shop-owner.component';

describe('SignupShopOwnerComponent', () => {
  let component: SignupShopOwnerComponent;
  let fixture: ComponentFixture<SignupShopOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupShopOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupShopOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
