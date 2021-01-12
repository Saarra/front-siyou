import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistApi: any;
  wishlistData: any;

  displayedColumns = ['product_image_url', 'product_name', 'product_description', 'supplier','email', 'brand_name','category_name','actions'];
  dataSource = new MatTableDataSource<any>(this.wishlistData);


  constructor(
    private wishlist : WishlistService,
    private productService: ProductsS2cService,
    private snackbar : MatSnackBar,
    private router : Router,
    private translate : TranslateService
  ) { }

  ngOnInit() {

    this.onGetWishlist();
  }

  onGetWishlist(){
    return this.wishlist.getWishlist().subscribe(
      res=>{
          this.wishlistApi = res;
          this.wishlistData = this.wishlistApi.wishList;

          this.displayedColumns = ['product_image_url', 'product_name', 'product_description', 'supplier','email', 'brand_name','category_name', 'actions'];
          this.dataSource = new MatTableDataSource<any>(this.wishlistData);



      }, err => {
        console.log(err);;
      }
    );

  }

  addProductToWishlist(product_id){
    const el={product_id};
    return this.productService.addProductToWhishlist(el).subscribe(
      res=>{
      //  this.redirectTo('shop/my-wishlist');
       this.router.navigate([`/shop/my-wishlist`]);

       this.snackbar.open(this.translate.currentLang === 'Chinese' ? "产品已成功添加到愿望单":this.translate.currentLang === 'Italian' ? "Prodotto aggiunto con successo alla tua lista dei desideri":'Product added successfully to your wishlist', '',{
        duration:2000
       });
        
      }, err => {
        console.log(err);;
      }
    );
  }


  deleteProductFromWishlist(product_id){
   const el={product_id};

 
   return this.productService.addProductToWhishlist(el).subscribe(
     res=>{

      //  this.redirectTo('shop/my-wishlist');
       this.router.navigate([`shop/my-wishlist`]);

       this.snackbar.open(this.translate.currentLang === 'Chinese' ? "产品已成功删除":this.translate.currentLang === 'Italian' ? "Prodotto eliminato correttamente dalla tua lista dei desideri":'Product deleted successfully from your wishlist', '',{
        duration:2000
      });
       
     }, err => {
       console.log(err);;
     }
   );
  }



  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }



  

}
