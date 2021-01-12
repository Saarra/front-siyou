import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChainComponent } from './edit-chain.component';

describe('EditChainComponent', () => {
  let component: EditChainComponent;
  let fixture: ComponentFixture<EditChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
