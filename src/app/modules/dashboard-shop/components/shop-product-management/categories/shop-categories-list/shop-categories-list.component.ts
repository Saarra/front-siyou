import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CategoriesService } from "src/app/shared/services/categories.service";
import {
  MatSnackBar,
  MatTableDataSource,
  MatDialogRef,
  MatDialog,
} from "@angular/material";
import { AddCategoryComponent } from "src/app/modules/dashboard-shop/components/shop-product-management/categories/add-category/add-category.component";

@Component({
  selector: "app-shop-categories-list",
  templateUrl: "./shop-categories-list.component.html",
  styleUrls: ["./shop-categories-list.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed, void",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
      transition(
        "expanded <=> void",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ShopCategoriesListComponent implements OnInit {
  categoryData: any;
  expanded = false;
  panelOpenState = false;
  categoryList: any;
  numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  displayedColumns = ["category_image", "category_name", "actions"];
  dataSource = new MatTableDataSource<any>();
  expandedElement: null;
  

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translate: TranslateService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.onGetCategoryList();
  }
  catLenght: number = 0;
  onGetCategoryList() {
    this.catLenght = 0;
    this.categoriesService.getCategoriesChosen().subscribe((categoryList) => {
      this.categoryList = categoryList;
      this.categoryData = this.categoryList.data;
      console.log(this.categoryList.data);

      this.dataSource = new MatTableDataSource<any>(this.categoryData);
      this.displayedColumns = ["category_image", "category_name", "actions"];
    });
  }
  openAddCategory() {
    this.dialog.open(AddCategoryComponent);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDeleteCategory(id: any) {
    return this.categoriesService.DeleteCategory(id).subscribe((res) => {
      this._snackBar.open(
        this.translate.currentLang === "Chinese"
          ? "类别已成功删除"
          : this.translate.currentLang === "Italian"
          ? "Categoria eliminata con successo"
          : "Category Successfully Deleted",
        "",
        {
          duration: 2000,
        }
      );
      this.onGetCategoryList();
    });
  }
 
}
