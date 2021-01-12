import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickPurchaseComponent } from './add-quick-purchase.component';

describe('AddQuickPurchaseComponent', () => {
  let component: AddQuickPurchaseComponent;
  let fixture: ComponentFixture<AddQuickPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuickPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuickPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
