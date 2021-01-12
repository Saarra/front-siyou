import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopCommissionComponent } from './add-shop-commission.component';

describe('AddShopCommissionComponent', () => {
  let component: AddShopCommissionComponent;
  let fixture: ComponentFixture<AddShopCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
