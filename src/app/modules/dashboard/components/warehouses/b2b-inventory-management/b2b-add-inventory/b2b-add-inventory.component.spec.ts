import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bAddInventoryComponent } from './b2b-add-inventory.component';

describe('B2bAddInventoryComponent', () => {
  let component: B2bAddInventoryComponent;
  let fixture: ComponentFixture<B2bAddInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bAddInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bAddInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
