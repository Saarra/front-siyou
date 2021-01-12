import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFundsCheckComponent } from './shop-funds-check.component';

describe('ShopFundsCheckComponent', () => {
  let component: ShopFundsCheckComponent;
  let fixture: ComponentFixture<ShopFundsCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFundsCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFundsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
