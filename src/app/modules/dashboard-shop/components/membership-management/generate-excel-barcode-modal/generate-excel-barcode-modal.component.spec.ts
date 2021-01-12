import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateExcelBarcodeModalComponent } from './generate-excel-barcode-modal.component';

describe('GenerateExcelBarcodeModalComponent', () => {
  let component: GenerateExcelBarcodeModalComponent;
  let fixture: ComponentFixture<GenerateExcelBarcodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateExcelBarcodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateExcelBarcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
