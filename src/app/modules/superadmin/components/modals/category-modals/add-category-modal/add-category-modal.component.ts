import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { Categories } from "src/app/shared/models/categories.model";
import { Router } from "@angular/router";
import { MatDialog, MatSnackBar } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-category-modal",
  templateUrl: "./add-category-modal.component.html",
  styleUrls: ["./add-category-modal.component.scss"],
})
export class AddCategoryModalComponent implements OnInit {
  categoryList;

  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.ongetCategoriesList();
  }

  ongetCategoriesList() {
    return this.categoryService.getCategoriesList().subscribe(
      (res) => {
        this.categoryList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onaddCategory(
    category_name,
    category_it,
    category_cn,
    category_fr,
    parent_category_id
  ) {
    var cat = {
      name: category_name,
      category_it: category_it,
      category_cn: category_cn,
      category_fr: category_fr,
      parent_id: parent_category_id,
    };
    return this.categoryService.addCategory(cat).subscribe(
      (res) => {
        // this.redirectTo('superadmin/categories');
        this.router.navigate(["superadmin/categories"]);
        this.dialog.closeAll();
        this.ongetCategoriesList();
        this.snackBar.open(
          this.translate.currentLang === "Chinese"
            ? "分类已成功添加"
            : this.translate.currentLang === "Italian"
            ? "Categoria aggiunta con successo"
            : "Category Added Successfully",
          "",
          {
            duration: 1000,
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNullValue() {
    return null;
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
