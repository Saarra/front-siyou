import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopOwnerComponent } from './add-shop-owner.component';

describe('AddShopOwnerComponent', () => {
  let component: AddShopOwnerComponent;
  let fixture: ComponentFixture<AddShopOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
