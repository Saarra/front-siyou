import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFullDetailsComponent } from './inventory-full-details.component';

describe('InventoryFullDetailsComponent', () => {
  let component: InventoryFullDetailsComponent;
  let fixture: ComponentFixture<InventoryFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
