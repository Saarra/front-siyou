import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditOperatorComponent } from './shop-edit-operator.component';

describe('ShopEditOperatorComponent', () => {
  let component: ShopEditOperatorComponent;
  let fixture: ComponentFixture<ShopEditOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
