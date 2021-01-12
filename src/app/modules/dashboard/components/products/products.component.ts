import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/shared/services/products.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from '../../modals/add-product/add-product.component';
import { environment } from 'src/environments/environment';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoryDetailsComponent } from '../../modals/category-details/category-details.component';


declare const $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {


  

  lastAddedProducts;
  BestSellersProducts;
  ProductsByDiscount;

  form: FormGroup;
  error: string;
  productsArray: any;
  carouselItems = [];
  startIndex = 0;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  uploadResponse = { status: '', message: '', filePath: '' };
  productsList = [
    {
      image: 'assets/images/prod6.jpg',
      name: 'Product 1',
      description: 'description 1',
    },
    {
      image: 'assets/images/prod2.jpg',
      name: 'Product 2',
      description: 'description 2'
    },
    {
      image: 'assets/images/prod4.jpg',
      name: 'Product 3',
      description: 'description 3'
    },
    {
      image: 'assets/images/prod6.jpg',
      name: 'Product 4',
      description: 'description 4'
    },
    {
      image: 'assets/images/prod1.jpg',
      name: 'Product 5',
      description: 'description 5',
    },
    {
      image: 'assets/images/prod5.jpg',
      name: 'Product 6',
      description: 'description 6'
    }
  ];
  masonryImages = [
    {
      image: 'assets/images/prod6.jpg'
    },
    {
      image: 'assets/images/prod1.jpg'
    },
    {
      image: 'assets/images/prod7.jpg'
    },
    {
      image: 'assets/images/prod5.jpg'
    },
    {
      image: 'assets/images/prod6.jpg'
    }
  ];
  @ViewChild('imageList', { static: false }) imageList: ElementRef;
  
  constructor(private productsService: ProductsService, private formBuilder: FormBuilder, private dialog: MatDialog,
    private categoriesService: CategoriesService) { }

  ngOnInit() {


    this.ongetBestSellersProducts();
    this.ongetLastAddedProducts();
    this.ongetProductsByDiscount();


    
    
    
    
    
    this.form = this.formBuilder.group({
      piece: ['']
    });
  
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.form.get('piece').setValue(file);
      const formData = new FormData();
      formData.append('products', this.form.get('piece').value);

      
      
      
      
      this.productsService.upload(formData).subscribe(
        (res: any) => {
          if (res.type) {
            res.body.forEach(element => {
              this.productsArray.push(element);
            });
          }
        }),
        (err) => 
        console.log(err);
      
      }
    }


  ngAfterViewInit() {
    
    

    
    
    
    
    
    
    
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  openAddProductModal() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productsArray.push(res);
      } else {
      }
    });

  }

  getProdImage(path) {
    return `${environment.baseImageUrl}/${path}`;
  }

  openCategoryDetailsModal(index) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent, {
      width: '800px',
      maxHeight: '600px'
    });
    dialogRef.componentInstance.productList = this.productsList.slice(0, (Math.floor(Math.random() * 5) + 1));
    
  }

  ongetLastAddedProducts(){
    return this.productsService.getLastAddedProducts().subscribe(
      res=>{
        this.lastAddedProducts=res;

      }
    );
  }

  ongetBestSellersProducts(){
    return this.productsService.getBestSellersProducts().subscribe(
      res=>{
        this.BestSellersProducts=res;

      }
    );
  }

  ongetProductsByDiscount(){
    return this.productsService.getProductsByDiscount().subscribe(
      res=>{
        this.ProductsByDiscount=res;
      }
    );
  }

}
