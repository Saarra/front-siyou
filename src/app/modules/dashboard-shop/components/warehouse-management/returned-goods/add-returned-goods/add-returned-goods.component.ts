import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { MatDialog,MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-returned-goods',
  templateUrl: './add-returned-goods.component.html',
  styleUrls: ['./add-returned-goods.component.scss']
})
export class AddReturnedGoodsComponent implements OnInit {

  chain;
  chainData;
  chainInit='';
  prods;
  prodsData;
  catList;
  page:number = 1;  
  displayedColumns = ['range_id','product_image', 'product_name','product_barcode','product_quantity'];
  dataSource = new MatTableDataSource<any>(this.prodsData);

  
  pager: any = {};
  



  constructor(
    private productService: ProductsS2cService,
    private chainService: ChainService,
    private categoryService: CategoriesService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit() {
    this.onGetChainList();
    this.onGetProdByBar();
    this.displayedColumns = ['range_id','product_image', 'product_name','product_barcode','product_quantity'];
  }


    onGetChainList(){

      return this.chainService.getChainList().subscribe(
        res=>{
           this.chain = res;
           this.chainData = this.chain.data;
        }, err => {
          console.log(err);;
        }
      );
  
    }
    
    product_quantity ="";
    product_barcode="";
    product_name="";


    onAddReturn(item_return,barcode,chain_id){
      var return_pro = {
        chain_id : chain_id,
        barcode: barcode,
        item_return:item_return
      }
      return this.productService.addReturnQuantity(return_pro).subscribe(
        res=> {
          this.dialog.closeAll();
          this.router.navigate(['/shop/returned-goods']); 
        }, err => {
          console.log(err);;
        }
      );
   }
  onGetProdByBar(chain_id?, barcode?){
      
      if(chain_id == 0 || !chain_id){
        chain_id = ''
      }
     
      if(barcode == 0 ||!barcode){
        barcode = ''
      }
       return this.productService.getProdByBar(chain_id,barcode).subscribe(
         res=> {
           this.prods = res;
           this.prodsData =  this.prods.data;
           this.product_quantity=this.prodsData.product_quantity;
           this.product_barcode=this.prodsData.product_barcode;
           this.product_name=this.prodsData.product_name;

         }, err => {
           console.log(err);;
         }
       );
    }
  
   
}
