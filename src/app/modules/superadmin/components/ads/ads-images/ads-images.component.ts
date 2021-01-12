import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from './../../../../../shared/services/advertisement.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ads-images',
  templateUrl: './ads-images.component.html',
  styleUrls: ['./ads-images.component.scss']
})
export class AdsImagesComponent implements OnInit {
  img;
  imgData;
  constructor(
    private advertisementService: AdvertisementService,
    private chainService: ChainService,
    private dialogRef: MatDialogRef<AdsImagesComponent>,
private snackBar : MatSnackBar,
public translate: TranslateService,


  ) { }

  ngOnInit() {
    this. onGetImages();
  }
  onGetImages() {
    return this.advertisementService.GetPhotos().subscribe(res => {
      this.img = res;
      this.imgData = this.img.data
      if (this.imgData.length == 0 ){
        this.snackBar.open('You Don\'t have pictures', '',{       
          duration:1000
        });
      }

    })
  }
  chain;
  chainData;

  imagedel
  onDelete(id){
    return this.advertisementService.deleteImage(id).subscribe(
      res => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "Image Deleted Successfully":this.translate.currentLang === 'Italian' ? "Image Deleted Successfully": "Image Deleted Successfully" , "OK", {
          duration: 1000,
        });
       this.onGetImages();        
      }, err => {
        console.log(err);;
      }
    );
  }
  cancel() {
    this.dialogRef.close()

  }
}
