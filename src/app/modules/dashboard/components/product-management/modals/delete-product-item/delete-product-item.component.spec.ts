import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductItemComponent } from './delete-product-item.component';

describe('DeleteProductItemComponent', () => {
  let component: DeleteProductItemComponent;
  let fixture: ComponentFixture<DeleteProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
