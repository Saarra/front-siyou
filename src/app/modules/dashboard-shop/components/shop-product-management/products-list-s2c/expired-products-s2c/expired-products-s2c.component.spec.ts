import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredProductsS2cComponent } from './expired-products-s2c.component';

describe('ExpiredProductsS2cComponent', () => {
  let component: ExpiredProductsS2cComponent;
  let fixture: ComponentFixture<ExpiredProductsS2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredProductsS2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredProductsS2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
