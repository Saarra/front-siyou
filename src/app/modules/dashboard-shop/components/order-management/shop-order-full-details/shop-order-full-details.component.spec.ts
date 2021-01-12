import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrderFullDetailsComponent } from './shop-order-full-details.component';

describe('ShopOrderFullDetailsComponent', () => {
  let component: ShopOrderFullDetailsComponent;
  let fixture: ComponentFixture<ShopOrderFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOrderFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrderFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
