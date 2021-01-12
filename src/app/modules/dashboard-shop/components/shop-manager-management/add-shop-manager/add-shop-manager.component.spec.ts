import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopManagerComponent } from './add-shop-manager.component';

describe('AddShopManagerComponent', () => {
  let component: AddShopManagerComponent;
  let fixture: ComponentFixture<AddShopManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
