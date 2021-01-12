import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineProductsComponent } from './online-products.component';

describe('OnlineProductsComponent', () => {
  let component: OnlineProductsComponent;
  let fixture: ComponentFixture<OnlineProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
