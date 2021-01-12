import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcachiersListComponent } from './shop-cachiers-list.component';

describe('ShopcachiersListComponent', () => {
  let component: ShopcachiersListComponent;
  let fixture: ComponentFixture<ShopcachiersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopcachiersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcachiersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
