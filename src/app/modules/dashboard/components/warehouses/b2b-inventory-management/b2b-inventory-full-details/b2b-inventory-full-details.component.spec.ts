import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bInventoryFullDetailsComponent } from './b2b-inventory-full-details.component';

describe('B2bInventoryFullDetailsComponent', () => {
  let component: B2bInventoryFullDetailsComponent;
  let fixture: ComponentFixture<B2bInventoryFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bInventoryFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bInventoryFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
