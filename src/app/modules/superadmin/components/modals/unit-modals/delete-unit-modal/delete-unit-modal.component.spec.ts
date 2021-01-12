import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnitModalComponent } from './delete-unit-modal.component';

describe('DeleteUnitModalComponent', () => {
  let component: DeleteUnitModalComponent;
  let fixture: ComponentFixture<DeleteUnitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUnitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUnitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
