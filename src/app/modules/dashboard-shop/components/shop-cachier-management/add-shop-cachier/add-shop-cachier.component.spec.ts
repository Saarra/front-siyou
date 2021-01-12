import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopcachierComponent } from './add-shop-cachier.component';

describe('AddShopcachierComponent', () => {
  let component: AddShopcachierComponent;
  let fixture: ComponentFixture<AddShopcachierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopcachierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopcachierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
