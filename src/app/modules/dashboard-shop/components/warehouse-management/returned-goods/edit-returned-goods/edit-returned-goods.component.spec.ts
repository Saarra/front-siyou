import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnedGoodsComponent } from './edit-returned-goods.component';

describe('EditReturnedGoodsComponent', () => {
  let component: EditReturnedGoodsComponent;
  let fixture: ComponentFixture<EditReturnedGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReturnedGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReturnedGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
