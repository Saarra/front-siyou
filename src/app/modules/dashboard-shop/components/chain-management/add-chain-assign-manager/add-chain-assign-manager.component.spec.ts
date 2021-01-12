import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChainAssignManagerComponent } from './add-chain-assign-manager.component';

describe('AddChainAssignManagerComponent', () => {
  let component: AddChainAssignManagerComponent;
  let fixture: ComponentFixture<AddChainAssignManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChainAssignManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChainAssignManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
