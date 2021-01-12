import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditMemberComponent } from './shop-edit-member.component';

describe('ShopEditMemberComponent', () => {
  let component: ShopEditMemberComponent;
  let fixture: ComponentFixture<ShopEditMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
