import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bEditInventoryComponent } from './b2b-edit-inventory.component';

describe('B2bEditInventoryComponent', () => {
  let component: B2bEditInventoryComponent;
  let fixture: ComponentFixture<B2bEditInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bEditInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bEditInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
