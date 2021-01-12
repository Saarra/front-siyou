import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopChooseSuppliersComponent } from './shop-choose-suppliers.component';

describe('ShopChooseSuppliersComponent', () => {
  let component: ShopChooseSuppliersComponent;
  let fixture: ComponentFixture<ShopChooseSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopChooseSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopChooseSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
