import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementImagesComponent } from './advertisement-images.component';

describe('AdvertisementImagesComponent', () => {
  let component: AdvertisementImagesComponent;
  let fixture: ComponentFixture<AdvertisementImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
