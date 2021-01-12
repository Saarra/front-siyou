import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnedGoodsComponent } from './add-returned-goods.component';

describe('AddReturnedGoodsComponent', () => {
  let component: AddReturnedGoodsComponent;
  let fixture: ComponentFixture<AddReturnedGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReturnedGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnedGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
