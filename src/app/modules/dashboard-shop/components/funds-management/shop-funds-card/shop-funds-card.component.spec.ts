import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFundsCardComponent } from './shop-funds-card.component';

describe('ShopFundsCardComponent', () => {
  let component: ShopFundsCardComponent;
  let fixture: ComponentFixture<ShopFundsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFundsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFundsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
