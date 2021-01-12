import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCommissionsComponent } from './products-commissions.component';

describe('ProductsCommissionsComponent', () => {
  let component: ProductsCommissionsComponent;
  let fixture: ComponentFixture<ProductsCommissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCommissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
