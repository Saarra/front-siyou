import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { BasketService } from 'src/app/core/services/basket.service';
import { BasketItem } from 'src/app/shared/models/basket-item';
import { MediaMatcher } from '@angular/cdk/layout';
import { OrderService } from 'src/app/core/services/order.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-basket-details',
  templateUrl: './basket-details.component.html',
  styleUrls: ['./basket-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BasketDetailsComponent implements OnInit {
  mobileQuery: MediaQueryList;
  basketItems: Array<BasketItem> = [];
  orderList: any = [];
  selected = false;
  dataSource: MatTableDataSource<any>;
  expandedElement: null;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
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
  displayedColumns = ['product_image', 'product_name', 'product_description', 'quantity', 'product_price', 'actions'];
  orderDisplayedColumns = ['order_date', 'order_price', 'logistic_company_name', 'logistic_value', 'supplier_name', 'order_statut', 'products_number', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private basketService: BasketService, media: MediaMatcher,
    private ordersService: OrderService, private snackBar: MatSnackBar,
    private companiesService: CompaniesService,
    public translate: TranslateService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
  }
  ngOnInit() {
    this.getBasketTransformedData();
    this.getShopOrders();
  }
  getBasketTransformedData() {
    this.basketService.transformBasketData().then((basketItems) => {
      this.basketItems = basketItems.map((element) => {
        element.isLogistic = false;
        element.logisticCompanies = null;
        element.logisticCompanyId = null;
        return element;
      });
    })
  }
  getOrderWeight(item) {
    const weight = item.products.reduce((sum, item) => {
      sum += item.quantity * item.product.product_weight;
      return sum;
    }, 0)
    return weight;
  }
  getTotalPrice(item: any) {
    const products = item.products;
    const totalPrice = products.reduce((accumulator, currentValue) => accumulator + currentValue.item_price, 0);
    return totalPrice;
  }
  getIvaTax(item: any) {
    const totalPrice = this.getTotalPrice(item);
    return totalPrice * 0.22;
  }
  makeOrder(item: any) {
    const orderData = {};
    const { id: supplier_id, products } = item;
    const order_total_price = this.getTotalPrice(item) + this.getIvaTax(item);
    const order_weight = this.getOrderWeight(item);
    const logistic_company_id = item.isLogistic ? item.logisticCompanyId : null;
    const logistic_tarif = item.isLogistic ? this.getCompanyById(item.logisticCompanies, logistic_company_id)[0].tarif[0] : null;
    const order_products_list = products.map(element => {
      const transformedElement = {};
      const { product: { id: product_id }, item_price: total_product_price, quantity: product_quantity } = element
      Object.assign(transformedElement, { product_id, total_product_price, product_quantity });
      return transformedElement;
    })
    Object.assign(orderData, { supplier_id, order_total_price, order_weight, logistic_tarif, logistic_company_id, order_products_list });
    this.basketService.updateBasketProductList(order_products_list).then(data => {
      this.getBasketTransformedData();
      this.ordersService.makeOrder(orderData).subscribe(orderSubmitted => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "订单已成功添加":this.translate.currentLang === 'Italian' ? "Ordine aggiunto con successo":'Order Added Succeffully !', '', {
          duration: 1500,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar']
        }).afterDismissed().subscribe(data => {
          this.getShopOrders();
        })
      }, err => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "新增订单出现错误":this.translate.currentLang === 'Italian' ? "Errore durante l'aggiunta di un nuovo ordine":'Error while adding new Order !', '', {
          duration: 1500,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar']
        })
        console.log(err);;
      })
    })
  }
  getShopOrders() {
    this.ordersService.getShopOrders().subscribe((orderList: any) => {
      this.orderList = orderList;
      this.dataSource = new MatTableDataSource(orderList);
    })
  }
  getCompanyById(array: any, id: number) {
    return array.filter(element => element.id === id);
  }
  onSelectionChange(args, item) {
    if (args.checked) {
      //console.log(item.logisticCompanies);
      if (!item.logisticCompanies) {
        const weight = this.getOrderWeight(item);
        this.companiesService.getLogisticCompaniesList(weight).subscribe(data => {
          item.logisticCompanies = data;
          item.logisticCompanyId = data[0].id;
        })
      } else {
        item.logisticCompanyId = item.logisticCompanies[0].id;
      }
    }
    item.isLogistic = !item.isLogistic
  }
  onSelectCard(item: any, index: number) {
    item.logisticCompanyId = index;
  }
  getCompaniesList(item) {
    const weight = this.getOrderWeight(item);
    return this.companiesService.getLogisticCompaniesList(weight);
  }
}
