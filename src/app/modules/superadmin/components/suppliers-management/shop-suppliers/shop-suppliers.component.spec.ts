import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSuppliersComponent } from './shop-suppliers.component';

describe('ShopSuppliersComponent', () => {
  let component: ShopSuppliersComponent;
  let fixture: ComponentFixture<ShopSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
