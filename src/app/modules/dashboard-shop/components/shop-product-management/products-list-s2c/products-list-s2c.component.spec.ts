import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListS2cComponent } from './products-list-s2c.component';

describe('ProductsListS2cComponent', () => {
  let component: ProductsListS2cComponent;
  let fixture: ComponentFixture<ProductsListS2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListS2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListS2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
