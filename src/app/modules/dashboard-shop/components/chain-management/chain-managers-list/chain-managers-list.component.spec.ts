import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainManagersListComponent } from './chain-managers-list.component';

describe('ChainManagersListComponent', () => {
  let component: ChainManagersListComponent;
  let fixture: ComponentFixture<ChainManagersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainManagersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainManagersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
