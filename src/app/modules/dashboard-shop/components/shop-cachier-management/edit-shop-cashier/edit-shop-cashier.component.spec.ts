import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopCashierComponent } from './edit-shop-cashier.component';

describe('EditShopCashierComponent', () => {
  let component: EditShopCashierComponent;
  let fixture: ComponentFixture<EditShopCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShopCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShopCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
