import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBrandModalComponent } from './delete-brand-modal.component';

describe('DeleteBrandModalComponent', () => {
  let component: DeleteBrandModalComponent;
  let fixture: ComponentFixture<DeleteBrandModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBrandModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
