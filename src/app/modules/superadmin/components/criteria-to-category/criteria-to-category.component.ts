import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { OrderService } from 'src/app/core/services/order.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { AddCategoryModalComponent } from '../modals/category-modals/add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from '../modals/category-modals/edit-category-modal/edit-category-modal.component';
import { DeleteCategoryModalComponent } from '../modals/category-modals/delete-category-modal/delete-category-modal.component';
import { AddCriteriaToCategoryComponent } from '../modals/category-criteria-modals/add-criteria-to-category/add-criteria-to-category.component';
import { RemoveCriteriaFromCategoryComponent } from '../modals/category-criteria-modals/remove-criteria-from-category/remove-criteria-from-category.component';
@Component({
  selector: 'app-criteria-to-category',
  templateUrl: './criteria-to-category.component.html',
  styleUrls: ['./criteria-to-category.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CriteriaToCategoryComponent implements OnInit {
  orderList: any;
  expandedElement: null;
  orderDisplayedColumns = ['category_name', 'created_at', 'updated_at', 'actions'];
  criteriaList: any;
  category_criterias_List;
  constructor(private orderService: OrderService,
    private criteriaService: CriteriaService,
    private categoryService: CategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.onGetCriteriaList();
    this.ongetCategoriesWithCriterias();
  }
  ongetCategoriesWithCriterias() {
    return this.categoryService.getCategoriesWithCriterias().subscribe(
      res => {
        this.category_criterias_List = res;
      }
    )
  }
  onGetCriteriaList() {
    return this.criteriaService.GetCriteriaList().subscribe(
      res => {
        this.criteriaList = res;
      }
    );
  }
  openAddCriteriaToCategoryModal() {
    this.dialog.open(AddCriteriaToCategoryComponent);
  }
  openRemoveCriteriaFromCategoryModal(_criteria: any, _category: any) {
    var data = {
      criteria: _criteria,
      category: _category
    }
    this.dialog.open(RemoveCriteriaFromCategoryComponent, { data });
  }
}
