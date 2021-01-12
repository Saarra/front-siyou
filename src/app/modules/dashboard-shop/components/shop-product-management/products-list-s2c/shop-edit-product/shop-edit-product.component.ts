import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatInput, MatDialog } from "@angular/material";
import { FormBuilder, Validators } from "@angular/forms";
import { ChainService } from "src/app/shared/services/chain.service";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { SupplierS2cService } from "src/app/shared/services/supplier-s2c.service";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import {ChooseCategoryComponent} from 'src/app/modules/dashboard-shop/components/shop-product-management/add-shop-product/choose-category/choose-category.component'

@Component({
  selector: "app-shop-edit-product",
  templateUrl: "./shop-edit-product.component.html",
  styleUrls: ["./shop-edit-product.component.scss"],
})
export class ShopEditProductComponent implements OnInit {
  formData: any;
  @ViewChild("resultInput", { static: false }) resultInput: ElementRef;

  currentProduct;
  currentProd;
  chain_id;
  barcode;
  chain;
  catList;
  chainList;
  chainData;
  categoriesList;
  categoryData;
  form;
  currentId;
  chainName;


  //constructor
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private productService: ProductsS2cService,
    private categoryService: CategoriesService,
    private supplierService: SupplierS2cService,
    public datepipe: DatePipe,
    public translate: TranslateService,
    private dialog: MatDialog,

  ) {
    activatedRouter.params.subscribe((params) => {
      this.currentId = params.barcode;
    });
    this.formData = new FormData();
  }
  categoryId;

  //onInit
  ngOnInit() {
    this.onGetProductById(this.currentId);
    this.onGetSuppliers();
    this.form = this.formBuilder.group({
      chain_id: [""],
      barcode: [""],
      product_name: [""],
      cost_price: [""],
      unit_price: [""],
      tax_rate: [""],
      product_quantity: [""],
      category_id: [""],
      product_image: [""],
      warn_quantity: [""],
      expired_date: [""],
      store_id: [""],
      supplier_id: [""],
      range_id: [""],
    });
    this.onGetChainList();
    this.onGetCategoriesList();
   
  }

  //get product by id function
  chainId;
  categoryname = "";
  onGetProductById(id) {
    return this.productService.getProductById(this.currentId).subscribe(
      (res) => {
        this.currentProduct = res;
        this.currentProd = this.currentProduct.data[0];
        this.categoryId = this.currentProd.category_id;
        this.categoryname = this.currentProd.category.category_name;

        this.chainId = this.currentProd.chain_id;
        console.log(this.currentProduct)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  catName;
  openChooseCategory() {
    let dialogRef = this.dialog.open(ChooseCategoryComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.categoryId=res.data.id
      this.categoryname = res.data.category_name
      console.log(res)
    })
}

  // get suppliers function
  suppliersList;
  suppliers;
  onGetSuppliers() {
    return this.supplierService.GetSuppliersListS2C().subscribe(
      (res) => {
        this.suppliersList = res;
        this.suppliers = this.suppliersList.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // get chains function
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      (res) => {
        this.chain = res;
        this.chainData = this.chain.data;
        for (let chain of this.chainData){
          if (chain.id == this.chainId) {
          this.chainName=chain.chain_name
        }
       }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // get categories function
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      (res) => {
        this.catList = res;
        this.categoryData = this.catList.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // smart search (suppliers) function

  onSearchChange(searchValue: string): void {
    this.suppliers = this.suppliers.filter((supplier) => {
      return (
        supplier.supplier_name
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) >= 0
      );
    });
    if (searchValue.length == 0) {
      this.onGetSuppliers();
    }
  }

  // toformdata for image in form
  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  // update product function
  onUpdateProduct(
    product_name,
    cost_price,
    unit_price,
    range_id,
    tax_rate,
    product_quantity,
    category_id,
    supplier_id,
    warn_quantity,
    expired_date
  ) {
    this.form.get("barcode").setValue(this.currentProd.product_barcode);
    this.form.get("product_quantity").setValue(product_quantity);
    this.form.get("category_id").setValue(this.categoryId);
    this.form.get("product_name").setValue(product_name);
    this.form.get("cost_price").setValue(cost_price);
    this.form.get("unit_price").setValue(unit_price);
    this.form.get("tax_rate").setValue(tax_rate);
    this.form.get("store_id").setValue(localStorage.getItem("store_id"));
    this.form.get("chain_id").setValue(this.chainId);
    this.form.get("supplier_id").setValue(supplier_id);
    this.form.get("range_id").setValue(range_id);
    this.form
      .get("expired_date")
      .setValue(this.datepipe.transform(expired_date, "yyyy-MM-dd"));
    this.form.get("warn_quantity").setValue(warn_quantity);
    this.formData = this.toFormData(this.form.value);

    this.productService.updateProduct(this.formData).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.open(
          this.translate.currentLang === "Chinese"
            ? "产品信息已成功更改"
            : this.translate.currentLang === "Italian"
            ? "Prodotto modificato con successo"
            : "Product Edited Successfully",
          "",
          { duration: 1000 }
        );
        this.router.navigate(["/shop/products-list-s2c"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // get file change for image
  getFileChange(event) {
    const fileInput = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      fileInput.value = file.name;
      this.form.get("product_image").setValue(file);
      this.formData.append(
        "product_image",
        this.form.get("product_image").value
      );
    }
  }

  // redirection function
  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
