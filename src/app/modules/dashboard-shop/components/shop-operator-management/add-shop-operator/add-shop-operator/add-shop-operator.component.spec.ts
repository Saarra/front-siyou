import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopOperatorComponent } from './add-shop-operator.component';

describe('AddShopOperatorComponent', () => {
  let component: AddShopOperatorComponent;
  let fixture: ComponentFixture<AddShopOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
