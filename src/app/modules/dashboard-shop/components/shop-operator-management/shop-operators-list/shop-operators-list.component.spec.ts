import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOperatorsListComponent } from './shop-operators-list.component';

describe('ShopOperatorsListComponent', () => {
  let component: ShopOperatorsListComponent;
  let fixture: ComponentFixture<ShopOperatorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOperatorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOperatorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
