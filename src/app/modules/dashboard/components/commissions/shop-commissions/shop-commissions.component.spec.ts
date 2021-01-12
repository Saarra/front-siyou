import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCommissionsComponent } from './shop-commissions.component';

describe('ShopCommissionsComponent', () => {
  let component: ShopCommissionsComponent;
  let fixture: ComponentFixture<ShopCommissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCommissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
