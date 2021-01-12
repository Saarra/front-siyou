import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChainAssignManagerComponent } from './update-chain-assign-manager.component';

describe('UpdateChainAssignManagerComponent', () => {
  let component: UpdateChainAssignManagerComponent;
  let fixture: ComponentFixture<UpdateChainAssignManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChainAssignManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChainAssignManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
