import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopS2cOverviewComponent } from './shop-s2c-overview.component';

describe('ShopS2cOverviewComponent', () => {
  let component: ShopS2cOverviewComponent;
  let fixture: ComponentFixture<ShopS2cOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopS2cOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopS2cOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
