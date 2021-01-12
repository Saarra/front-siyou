import { AdvertisementService } from './../../../../shared/services/advertisement.service';
import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatDialog, MatInput, MatSnackBar } from '@angular/material';
import { AdvertisementImagesComponent } from './advertisement-images/advertisement-images.component'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;

  form: any;
  formData: any;
  imagePath;
  imgURL: any;
  message: string;

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private advertisementService: AdvertisementService,
    private chainService: ChainService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,
public translate: TranslateService,

  ) {
    this.formData = new FormData();

  }
  ngOnInit() {
    this.onGetImages();
    this.onGetChainList();
    this.form = this.formBuilder.group({
      advertisement_image: [''],
      timer: ['']

    })
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }
 
 
  preview(files) {
  
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  getFileChange(event) {
    const fileInputImg = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      var reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file); 
     reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
      fileInputImg.value = file.name;
      this.form.get('advertisement_image').setValue(file);
      this.formData.append('advertisement_image', this.form.get('advertisement_image').value);
    }
  }
  
  img;
  imgData;
  onGetImages(chain_id?) {
    return this.advertisementService.GetPhotos(chain_id).subscribe(res => {
      this.img = res;
      this.imgData = this.img.data

    })
  }
  chain;
  chainData;
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chain = res;
        this.chainData = this.chain.data
      }, err => {
        console.log(err);;
      }
    );

  }
  onAddImage(chain_id,timer){
    this.form.get('timer').setValue(timer);

    this.formData = this.toFormData(this.form.value);

      this.advertisementService.addPhotos(chain_id,this.formData).subscribe(res => {

        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "Image Added Successfully":this.translate.currentLang === 'Italian' ? "Image Added Successfully": "Image Added Successfully" , "OK", {
          duration: 1000,
        });
        this.onGetImages(chain_id) 
      }, err => {
        console.log(err);;
      });
    }
    imagedel
    onDelete(id,chain_id){
      return this.advertisementService.deleteImage(id).subscribe(
        res => {
         this.onGetImages(chain_id);        
        }, err => {
          console.log(err);;
        }
      );
    }
    onSelectAdmode(){
    const spinner = document.getElementById('pc') as HTMLElement;
    spinner.style.width = '70%';

    }
    onSelectCashmode(){
      const spinner = document.getElementById('pc') as HTMLElement;
      spinner.style.width = '90%';
  
      }
      openImages(){
        let dialogRef = this.dialog.open(AdvertisementImagesComponent)
        dialogRef.afterClosed().subscribe(res => {
        }) 
      }
   
}
   
