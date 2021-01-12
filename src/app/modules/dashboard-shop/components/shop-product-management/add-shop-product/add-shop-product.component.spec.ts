import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopProductComponent } from './add-shop-product.component';

describe('AddShopProductComponent', () => {
  let component: AddShopProductComponent;
  let fixture: ComponentFixture<AddShopProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
