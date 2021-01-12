import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPromotionComponent } from './history-promotion.component';

describe('HistoryPromotionComponent', () => {
  let component: HistoryPromotionComponent;
  let fixture: ComponentFixture<HistoryPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
