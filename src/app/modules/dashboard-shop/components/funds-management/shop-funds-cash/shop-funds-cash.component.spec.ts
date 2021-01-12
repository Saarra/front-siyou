import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFundsCashComponent } from './shop-funds-cash.component';

describe('ShopFundsCashComponent', () => {
  let component: ShopFundsCashComponent;
  let fixture: ComponentFixture<ShopFundsCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFundsCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFundsCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
