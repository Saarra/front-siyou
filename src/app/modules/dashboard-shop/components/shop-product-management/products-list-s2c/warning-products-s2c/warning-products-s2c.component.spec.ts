import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningProductsS2cComponent } from './warning-products-s2c.component';

describe('WarningProductsS2cComponent', () => {
  let component: WarningProductsS2cComponent;
  let fixture: ComponentFixture<WarningProductsS2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningProductsS2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningProductsS2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
