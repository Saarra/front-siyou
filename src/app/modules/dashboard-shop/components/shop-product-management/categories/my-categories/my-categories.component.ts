import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MatSnackBar, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface sortCategory {
  category_id?: any;
  order?: any;
}
@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class MyCategoriesComponent implements OnInit {
  categoryData;
  expanded = false;
  panelOpenState = false;
  categoryList: any;
  sort: boolean = false;
  todo: any = [

  ];

  done: any = [

  ];
  displayedColumns = ['category_image', 'category_name', 'actions'];
  dataSource = new MatTableDataSource<any>(this.categoryData);
  expandedElement: null;
  constructor(private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translate: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }
  ngOnInit() {
    this.onGetCategoryList();
  }

  categories_orders : sortCategory[] = [];


  catLenght: number = 0;
  categoryTolist = [];
  onGetCategoryList() {
    this.catLenght = 0;
    this.categoriesService.getMyCategoriesS2CList().subscribe(categoryList => {
      this.categoryList = categoryList;
      this.categoryData = this.categoryList.data[0].sub_categories
      this.dataSource = new MatTableDataSource<any>(this.categoryData);
      this.displayedColumns = ['category_image', 'category_name', 'actions'];
      this.categoryData.forEach(element => {
        var todo = {
          id: element.id,
          name : element.category_name
        }
        this.todo.push(todo)

      });
      // this.todo.forEach(element => {
      //   var sortCategory: sortCategory = {
      //     category_id: element.id,
      //   }
      //   this.categories_orders.push(sortCategory)
      // })
      // console.log(this.categories_orders)

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDeleteCategory(id: any) {
    return this.categoriesService.DeleteMyCategory(id).subscribe(
      res => {
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "类别已成功删除" : this.translate.currentLang === 'Italian' ? "Categoria eliminata con successo" : 'Category Successfully Deleted', '', {
          duration: 2000,
        });
        this.onGetCategoryList();
      })
  }
 
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
      var f = 0;
      var i = 1;

      if (this.categories_orders.length == 0) {
        var test : sortCategory = {
          category_id :  event.container.data[0].id,
          order : event.currentIndex + 1
        }
        this.categories_orders.push(test)
      }
      else {
        this.categories_orders.forEach((ele) => {
          if (ele.category_id == event.container.data[i].id ) {
            f = 1;
            ele.order = event.currentIndex +1;
            i = i + 1;
          }
        });
        
        if (f == 0) {
          var __test : sortCategory = {
            category_id :  event.container.data[i].id,
            order : event.currentIndex +1
          }
          i = i + 1;

          this.categories_orders.push(__test)
        }
      }
  

    console.log(this.categories_orders)
   
  }




  onEditSort() {
    var cat = {
      categories_orders: this.categories_orders
    }
    return this.categoriesService.editSort(cat).subscribe((res) => {
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "分类成功更新":this.translate.currentLang === 'Italian' ? "Categoria aggiornata con successo":'Category Updated Successfully', '',{       
           duration: 1000
      })
      this.sort = false
      this.onGetCategoryList();
    });
  }
  edit() {
    this.sort = true
  }
}
