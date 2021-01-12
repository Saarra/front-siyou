import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopmanagerComponent } from './add-shopmanager.component';

describe('AddShopmanagerComponent', () => {
  let component: AddShopmanagerComponent;
  let fixture: ComponentFixture<AddShopmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
