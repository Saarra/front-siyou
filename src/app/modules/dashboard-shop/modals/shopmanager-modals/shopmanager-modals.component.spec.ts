import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopmanagerModalsComponent } from './shopmanager-modals.component';

describe('ShopmanagerModalsComponent', () => {
  let component: ShopmanagerModalsComponent;
  let fixture: ComponentFixture<ShopmanagerModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopmanagerModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopmanagerModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
