import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsS2cComponent } from './product-details-s2c.component';

describe('ProductDetailsS2cComponent', () => {
  let component: ProductDetailsS2cComponent;
  let fixture: ComponentFixture<ProductDetailsS2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsS2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsS2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
