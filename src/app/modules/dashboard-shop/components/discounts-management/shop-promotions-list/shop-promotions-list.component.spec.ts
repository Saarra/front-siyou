import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPromotionsListComponent } from './shop-promotions-list.component';

describe('ShopPromotionsListComponent', () => {
  let component: ShopPromotionsListComponent;
  let fixture: ComponentFixture<ShopPromotionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPromotionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPromotionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
