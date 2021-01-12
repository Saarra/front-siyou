import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrdersComponent } from './pre-orders.component';

describe('PreOrdersComponent', () => {
  let component: PreOrdersComponent;
  let fixture: ComponentFixture<PreOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
