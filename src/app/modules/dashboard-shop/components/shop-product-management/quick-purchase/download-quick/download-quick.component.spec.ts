import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadQuickComponent } from './download-quick.component';

describe('DownloadQuickComponent', () => {
  let component: DownloadQuickComponent;
  let fixture: ComponentFixture<DownloadQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
