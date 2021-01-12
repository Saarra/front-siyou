import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditManagerComponent } from './shop-edit-manager.component';

describe('ShopEditManagerComponent', () => {
  let component: ShopEditManagerComponent;
  let fixture: ComponentFixture<ShopEditManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
