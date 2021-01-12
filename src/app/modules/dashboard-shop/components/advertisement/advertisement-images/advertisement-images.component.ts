import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from './../../../../../shared/services/advertisement.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-advertisement-images',
  templateUrl: './advertisement-images.component.html',
  styleUrls: ['./advertisement-images.component.scss']
})
export class AdvertisementImagesComponent implements OnInit {
  img;
  imgData;
  constructor(
    private advertisementService: AdvertisementService,
    private chainService: ChainService,
    private dialogRef: MatDialogRef<AdvertisementImagesComponent>,
private snackBar : MatSnackBar,
public translate: TranslateService,


  ) { }

  ngOnInit() {
    this.onGetChainList()
  }
  onGetImages(chain_id?) {
    return this.advertisementService.GetPhotos(chain_id).subscribe(res => {
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
  imagedel
  onDelete(id,chain_id){
    return this.advertisementService.deleteImage(id).subscribe(
      res => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "Image Deleted Successfully":this.translate.currentLang === 'Italian' ? "Image Deleted Successfully": "Image Deleted Successfully" , "OK", {
          duration: 1000,
        });
       this.onGetImages(chain_id);        
      }, err => {
        console.log(err);;
      }
    );
  }
  cancel() {
    this.dialogRef.close()

  }
}
