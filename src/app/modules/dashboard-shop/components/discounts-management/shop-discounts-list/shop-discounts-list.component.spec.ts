import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDiscountsListComponent } from './shop-discounts-list.component';

describe('ShopDiscountsListComponent', () => {
  let component: ShopDiscountsListComponent;
  let fixture: ComponentFixture<ShopDiscountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDiscountsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDiscountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
