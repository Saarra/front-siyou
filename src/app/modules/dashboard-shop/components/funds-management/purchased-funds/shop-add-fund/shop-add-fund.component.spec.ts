import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddFundComponent } from './shop-add-fund.component'

describe('ShopAddFundComponent', () => {
  let component: ShopAddFundComponent;
  let fixture: ComponentFixture<ShopAddFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
