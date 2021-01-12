import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditProductComponent } from './shop-edit-product.component';

describe('ShopEditProductComponent', () => {
  let component: ShopEditProductComponent;
  let fixture: ComponentFixture<ShopEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
