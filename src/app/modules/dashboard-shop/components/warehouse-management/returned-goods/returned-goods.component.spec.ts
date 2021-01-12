import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedGoodsComponent } from './returned-goods.component';

describe('ReturnedGoodsComponent', () => {
  let component: ReturnedGoodsComponent;
  let fixture: ComponentFixture<ReturnedGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnedGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
