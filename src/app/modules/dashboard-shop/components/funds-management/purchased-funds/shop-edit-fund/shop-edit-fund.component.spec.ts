import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditFundComponent } from './shop-edit-fund.component';

describe('ShopEditFundComponent', () => {
  let component: ShopEditFundComponent;
  let fixture: ComponentFixture<ShopEditFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
