import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManagersListComponent } from './shop-managers-list.component';

describe('ShopManagersListComponent', () => {
  let component: ShopManagersListComponent;
  let fixture: ComponentFixture<ShopManagersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopManagersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopManagersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
