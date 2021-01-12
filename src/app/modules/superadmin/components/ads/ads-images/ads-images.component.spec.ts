import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsImagesComponent } from './ads-images.component';

describe('AdsImagesComponent', () => {
  let component: AdsImagesComponent;
  let fixture: ComponentFixture<AdsImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
