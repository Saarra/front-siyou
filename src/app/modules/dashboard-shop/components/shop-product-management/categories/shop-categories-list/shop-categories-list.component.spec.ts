import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategoriesListComponent } from './shop-categories-list.component';

describe('ShopCategoriesListComponent', () => {
  let component: ShopCategoriesListComponent;
  let fixture: ComponentFixture<ShopCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
