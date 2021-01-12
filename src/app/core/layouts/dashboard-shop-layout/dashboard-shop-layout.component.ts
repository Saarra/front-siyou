import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { PopperContent } from "ngx-popper";
import { MatIcon } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Location } from "@angular/common";
import { NavService } from "../../services/nav.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { Subscription } from "rxjs";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/shared/services/user.service";
@Component({
  selector: "app-dashboard-shop-layout",
  templateUrl: "./dashboard-shop-layout.component.html",
  styleUrls: ["./dashboard-shop-layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardShopLayoutComponent implements OnInit {
  subscription: Subscription;
  basketLength;
  basket;
  orderTotal = 0;
  mobileQuery: MediaQueryList;
  accounts_payable;
  add_new_shop_manager;
  add_product;
  add_quick_purchase;
  add_shop_cashier;
  add_shop_operator;
  advertisement;
  affect_discount;
  b2s_order_management;
  b2s_products;
  S2C;
  B2S;
  discount_history;
  discount_list;
  inventory_history;
  inventory_management;
  level_list;
  member_list;
  my_account;
  my_category;
  my_suppliers;
  my_wishlist;
  payment_methods;
  product_list;
  promotion_history;
  promotion_list;
  purchase_order;
  returned_goods;
  s2c_orders_list;
  sales_funds;
  shop_cashiers_list;
  shop_managers_list;
  shop_operators_list;
  siyou_categories;
  siyou_suppliers;
  statistics;
  stock_management;
  warehouse;
  warehouse_management;
  navItemsDashboard: Array<any>
  navItemsQuickPurchase: Array<any> 
  navItemsPurchase: Array<any>
  navItemsStore: Array<any> 
  navItemsWarehouse: Array<any>
  navItemsAccount: Array<any> 
  store_list;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  variable = true;
  nameLink = "Dashboard";
  routeLink = "/shop/shopoverview";
  keywords = [];
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  tablink = [];
  private mobileQueryListener: () => void;
  @ViewChild("popperContent", { static: true }) popperContent: PopperContent;
  @ViewChild("shopping_basket", { static: false }) shoppingBasket: MatIcon;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userService: UserService,
    private route: Router,
    public translate: TranslateService,
    private _location: Location,
    public navService: NavService,
    private router: Router,
    private http: HttpClient
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 2400px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    translate.addLangs(["English", "Italian", "Chinese"]);
    if (this.variable) {
      this.subscription = this.navService.onLink().subscribe((res) => {
        this.subscription = this.navService.onName().subscribe((resu) => {
          this.routeLink = res;
          this.nameLink = resu;
        });
        var tab = { name: "", route: "" };
        tab.name = this.nameLink;
        tab.route = this.routeLink;
        if (this.tablink.length < 2) {
          this.tablink.push(tab);
        } else {
          this.tablink = [];
          this.tablink.push(tab);
        }
      });
    }
  }
  name;
  email;
  image;
  lastname;
  allItems;
  prodexpLength: number = 0;
  prodwarnLength: number = 0;
  data;
  badge: number;
  ngOnInit() {
    this.getMyInfos();

    this.http
      .post(`${environment.BaseUrlS2C}/Product/expiration`, this.data, {
        params: {
          token: localStorage.getItem("token"),
        },
      })
      .subscribe((data) => {
        this.allItems = data;
        this.prodexpLength = this.allItems.total;
      });
    if ((this.prodexpLength = 0)) {
      this.badge = 1;
    }
    this.http
      .post(`${environment.BaseUrlS2C}/Product/warn`, this.data, {
        params: {
          token: localStorage.getItem("token"),
        },
      })
      .subscribe((data) => {
        this.allItems = data;
        this.prodwarnLength = this.allItems.total;
      });
    if ((this.prodwarnLength = 0)) {
      this.badge = 1;
    }
    if ((this.prodexpLength = 0) && (this.prodwarnLength = 0)) {
      this.badge = 0;
    } else {
      this.badge = 2;
    }

    this.getBasketLength();
    this.getBasketProducts();
    this.name = localStorage.getItem("first_name");
    this.lastname = localStorage.getItem("last_name");
    this.image = localStorage.getItem("img_url");
    this.email = localStorage.getItem("userEmail");
    this.openStore();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || "").trim() && this.tablink.indexOf(value.trim()) === -1) {
      this.tablink.push(value.trim());
    }
    if (input) {
      input.value = "";
    }
  }
  remove(link: any): void {
    let index = this.tablink.indexOf(link);
    if (index >= 0) {
      this.tablink.splice(index, 1);
    }
  }
  redirection() {
    //console.log(this.tablink, this.tablink.length);
    this.redirectTo(this.tablink[this.tablink.length - 1].route);
  }
  user;
  getMyInfos() {
    return this.userService.getUser().subscribe((res) => {
      this.user = res;
       localStorage.setItem('cost_price' , this.user.hide_cost_price)
      this.B2S= this.user.menu.B2s;
      this.S2C= this.user.menu.s2c;
      this.accounts_payable = this.user.menu.accounts_payable;
      this.add_new_shop_manager = this.user.menu.add_new_shop_manager;
      this.add_product = this.user.menu.add_product
      this.add_quick_purchase = this.user.menu.add_quick_purchase
      this.add_shop_cashier = this.user.menu.add_shop_cashier
      this.add_shop_operator= this.user.menu.add_shop_operator
      this.advertisement = this.user.menu.advertisement
      this.affect_discount = this.user.menu.affect_discount
      this.b2s_order_management = this.user.menu.b2s_order_management
      this.b2s_products = this.user.menu.b2s_products
      this.discount_history  = this.user.menu.discount_history
      this.discount_list = this.user.menu.discount_list
      this.inventory_history = this.user.menu.inventory_history
      this.inventory_management = this.user.menu.inventory_management
      this.level_list = this.user.menu.level_list
      this.member_list = this.user.menu.member_list
      this.my_account = this.user.menu.my_account
      this.my_category = this.user.menu.my_category
      this.my_suppliers = this.user.menu.my_suppliers
      this.my_wishlist = this.user.menu.my_wishlist
      this.payment_methods = this.user.menu.payment_methods
      this.product_list = this.user.menu.product_list
      this.promotion_history = this.user.menu.promotion_history
      this.promotion_list = this.user.menu.promotion_list
      this.purchase_order = this.user.menu.purchase_order
      this.returned_goods = this.user.menu.returned_goods
      this.s2c_orders_list = this.user.menu.s2c_orders_list
      this.sales_funds = this.user.menu.sales_funds
      this.shop_cashiers_list = this.user.menu.shop_cashiers_list
      this.shop_managers_list = this.user.menu.shop_managers_list
      this.shop_operators_list = this.user.menu.shop_operators_list
      this.siyou_categories = this.user.menu.siyou_categories
      this.siyou_suppliers = this.user.menu.siyou_suppliers
      this.statistics = this.user.menu.statistics
      this.stock_management = this.user.menu.stock_management
      this.warehouse = this.user.menu.warehouse
      this.warehouse_management = this.user.menu.warehouse_management,
      this.store_list=  this.user.menu.store_list 
      this.navItemsDashboard = [
        {
          displayName: "Dashboard",
          displayNameIT: "Pannello di controllo",
          displayNameCH: "仪表板",
          displayNameFR: "Tableau du bord",
          iconName: "dashboard",
          route: "shop/shopoverview",
          can_view: this.statistics,

          
        },
      ];
      this.navItemsQuickPurchase = [
        {
          displayName: "Purchase  Order",
          displayNameIT: "Ordinazione d'acquisto",
          displayNameCH: "快速采购",
          displayNameFR: "Bon de commande",
          iconName: "shopping_bag",
          can_view: this.purchase_order,
          children: [
            {
              displayName: "Add Quick Purchase",
              displayNameIT: "Acquisto Veloce",
              displayNameCH: "快速采购",
              displayNameFR: "Achat rapide",
              iconName: "shopping_basket",
              route: "shop/add-quick-purchase",
              can_view: this.add_quick_purchase,
            },
            {
              displayName: "Purchase  Order",
              displayNameIT: "Ordinazione d'acquisto",
              displayNameCH: "采购订单",
              displayNameFR: "Bon de commande",
              iconName: "list",
              route: "shop/quick-purchase",
              can_view: this.purchase_order,
            },
          ],
        },
      ];
      this.navItemsPurchase = [
        {
          displayName: "Products",
          displayNameIT: "Prodotti",
          displayNameCH: "产品展示",
          displayNameFR: "Produits",
          svgIcon: "products",
          can_view: this.b2s_products,
          children: [
            {
              displayName: "Products",
              displayNameIT: "Prodotti",
              displayNameCH: "产品展示",
              displayNameFR: "Produits",
              iconName: "format_list_bulleted",
              route: "shop/products-list",
              can_view: this.b2s_products,
            },
            {
              displayName: "Purchased",
              displayNameIT: "Acquistata",
              displayNameCH: "已购买",
              displayNameFR: "Acheté",
              iconName: "shopping_basket",
              route: "shop/purshased",
              can_view: this.b2s_products,
            },
            {
              displayName: "My Wishlist",
              displayNameIT: "La mia lista dei desideri",
              displayNameCH: "我的收藏",
              displayNameFR: "Ma liste d envies",
              iconName: "supervised_user_circle",
              route: "shop/my-wishlist",
              can_view: this.b2s_products,
            },
          ],
        },
        {
          displayName: "Order Management",
          displayNameIT: "Gestione degli ordini",
          displayNameCH: "采购订单管理",
          displayNameFR: "La gestion des commandes",
          svgIcon: "orders",
          can_view: this.b2s_order_management,
          children: [
            {
              displayName: "Orders Pending Review",
              displayNameIT: "Ordini non validi",
              displayNameCH: "订单等待审核",
              displayNameFR: "Commandes non valides",
              iconName: "privacy_tip",
              route: "shop/invalid-orders",
              can_view: this.b2s_order_management,
            },
            {
              displayName: "Orders Confirmed",
              displayNameIT: "Ordini validi",
              displayNameCH: " 订单已确认",
              displayNameFR: "Commandes valides",
              iconName: "offline_pin",
              route: "shop/valid-orders",
              can_view: this.b2s_order_management,
            },
            {
              displayName: "Paid Orders",
              displayNameIT: "Ordini pagati",
              displayNameCH: "已支付订单",
              displayNameFR: "Commandes payées",
              iconName: "ballot",
              route: "shop/paid-orders",
              can_view: this.b2s_order_management,
            },
          ],
        },
      ];
      this.navItemsStore= [
        {
          displayName: "Orders List",
          displayNameIT: "Elenco ordini",
          displayNameCH: "收银订单数量",
          displayNameFR: "Liste des commandes",
          iconName: "list_alt",
          can_view: this.s2c_orders_list,
          route: "shop/orders-list",
        },
        {
          displayName: "Suppliers",
          displayNameIT: "Fornitori",
          displayNameCH: "供货商",
          displayNameFR: "Les Fournisseurs",
          can_view: this.siyou_suppliers,
          iconName: "supervised_user_circle",
          children: [
            {
              displayName: "Siyou Suppliers",
              displayNameIT: "Elenco dei fornitori",
              displayNameCH: "Siyou供货商",
              displayNameFR: "Liste des fournisseurs",
              iconName: "supervised_user_circle",
              route: "shop/suppliers-list",
              can_view: this.siyou_suppliers,
            },
            {
              displayName: "My suppliers",
              displayNameIT: "Elenco dei fornitori",
              displayNameCH: "我的供货商",
              displayNameFR: "Mes fournisseurs",
              iconName: "supervised_user_circle",
              route: "shop/my-suppliers",
              can_view: this.my_suppliers,
            },
          ],
        },
        {
          displayName: "My Products",
          displayNameIT: "I miei prodotti",
          displayNameCH: "我的产品",
          displayNameFR: "Mes produits",
          can_view: this.product_list,
          iconName: "shopping_bag",
          children: [
            {
              displayName: "Add Product",
              displayNameIT: "Aggiungi prodotto",
              displayNameCH: "添加产品",
              displayNameFR: "Ajouter un produit",
              iconName: "playlist_add",
              can_view: this.add_product,
              route: "shop/add-product",
            },
            {
              displayName: "Products List",
              displayNameIT: "Elenco dei prodotti",
              displayNameCH: "产品列表",
              displayNameFR: "Listes des produits",
              iconName: "format_list_bulleted",
              route: "shop/products-list-s2c",
              can_view: this.product_list,
            },
          ],
        },
        {
          displayName: "Category",
          displayNameIT: "Categoria",
          displayNameCH: "类别",
          displayNameFR: "Catégorie",
          iconName: "list_alt",
          can_view: this.siyou_categories,
          children: [
            {
              displayName: "Siyou Categories",
              displayNameIT: "Categoria della Piattaforma",
              displayNameCH: "Siyou类别",
              displayNameFR: "Catégorie de plateforme",
              iconName: "list_alt",
              can_view: this.siyou_categories,
              route: "shop/categories",
            },
            {
              displayName: "My Category",
              displayNameIT: "La Mia Categoria",
              displayNameCH: "本地零售",
              displayNameFR: "Mes catégories",
              iconName: "list_alt",
              can_view: this.my_category,
              route: "shop/my-categories",
            },
          ],
        },
        {
          displayName: "Promotion",
          displayNameIT: "Promozione",
          displayNameCH: "促销",
          displayNameFR: "Promotion",
          can_view: this.promotion_list,
          iconName: "local_offer",
          children: [
            {
              displayName: "Promotion",
              displayNameIT: "Promozione",
              displayNameCH: "促销",
              displayNameFR: "Promotion",
              iconName: "toc",
              route: "shop/offline-promotions-list",
              can_view: this.promotion_list,
            },
            {
              displayName: "History Promotion",
              displayNameIT: " Promozione della storia",
              displayNameCH: "促销历史",
              displayNameFR: "Historique de Promotion",
              iconName: "receipt_long",
              route: "shop/promotion-history",
              can_view: this.promotion_history,
            },
            {
              displayName: "Discount",
              displayNameIT: "Sconto",
              displayNameCH: "折扣",
              displayNameFR: "Remise",
              iconName: "toc",
              route: "shop/offline-discounts-list",
              can_view: this.discount_list,
            },
            {
              displayName: "History Discount",
              displayNameIT: "Sconto storico",
              displayNameCH: "折扣历史",
              displayNameFR: "Historique",
              iconName: "receipt_long",
              route: "shop/discount-history",
              can_view: this.discount_history,
            },
          ],
        },
        {
          displayName: "Members",
          displayNameIT: "Membri",
          displayNameCH: "会员",
          displayNameFR: "Membres",
          iconName: "supervised_user_circle",
          can_view: this.member_list,
          children: [
            {
              displayName: "Members List",
              displayNameIT: "Elenco dei membr",
              displayNameCH: "会员名单",
              displayNameFR: "Liste des Membres",
              iconName: "people",
              route: "shop/membership-management",
              can_view: this.member_list,
            },
            {
              displayName: "Level List",
              displayNameIT: "Elenco dei livelli",
              displayNameCH: "等级列表",
              displayNameFR: "Liste des niveaux",
              iconName: "verified",
              route: "shop/level-membership-management",
              can_view: this.level_list,
            },
          ],
        },
        {
          displayName: "Funds",
          displayNameIT: "Fondi",
          displayNameCH: "资金",
          displayNameFR: "Fonds",
          can_view: this.accounts_payable,
          iconName: "monetization_on",
          children: [
            {
              displayName: "Sales Funds",
              displayNameIT: "Fondi di Vendita",
              displayNameCH: "销售资金",
              displayNameFR: "Fonds de Vente",
              iconName: "credit_card",
              can_view: this.sales_funds,
              route: "shop/funds-card",
            },
            {
              displayName: "Accounts Payable",
              displayNameIT: "Fondi Acquistati",
              displayNameCH: "应付账款",
              displayNameFR: "Fonds Achetés",
              iconName: "local_atm",
              can_view: this.accounts_payable,
              route: "shop/purchased-funds",
            },
            {
              displayName: "Payment Methods",
              displayNameIT: "Modalità di Pagamento",
              displayNameCH: "设置支付方式",
              displayNameFR: "Méthodes de Payement",
              iconName: "payments",
              can_view: this.payment_methods,
              route: "shop/payment-methods",
            },
          ],
        },
        {
          displayName: "User Management",
          displayNameIT: "Gestione utenti",
          displayNameCH: "用户管理",
          displayNameFR: "Gestion des utilisateurs",
          can_view: this.shop_cashiers_list,
          iconName: "folder_shared",
          children: [
            {
              displayName: "Stores",
              displayNameIT: "I negozi",
              displayNameCH: "门店",
              displayNameFR: "Magasins",
              can_view: this.store_list,
              iconName: "store_mall_directory",
              children: [
                {
                  displayName: "Stores List",
                  displayNameIT: "Elenco negozi",
                  displayNameCH: "门店清单",
                  displayNameFR: "Liste des magasins",
                  iconName: "list",
                  can_view: this.store_list,
                  route: "shop/chains-list",
                },
                {
                  displayName: "Add New Store",
                  displayNameIT: "Aggiungi nuovo negozio",
                  displayNameCH: "新增门店",
                  displayNameFR: "Ajouter un nouveau magasin",
                  iconName: "add_business",
                  can_view: this.store_list,
                  route: "shop/add-chain",
                },
              ],
            },
            {
              displayName: "Managers",
              displayNameIT: "I gestori",
              displayNameCH: "管理人员",
              displayNameFR: "Directeurs",
              iconName: "supervised_user_circle",
              can_view: this.shop_managers_list,
              children: [
                {
                  displayName: "Shop Managers List",
                  displayNameIT: "Elenco dei gestori di negozi",
                  displayNameCH: "店铺经理名单",
                  displayNameFR: "Liste des directeurs de magasin",
                  iconName: "format_list_bulleted",
                  can_view: this.shop_managers_list,
                  route: "shop/shopmanagers-list",
                },
                {
                  displayName: "Add New Shop Manager",
                  displayNameIT: "Aggiungi nuovo responsabile negozio",
                  displayNameCH: "添加新店经理",
                  displayNameFR: "Ajouter un nouveau responsable de boutique",
                  iconName: "group_add",
                  can_view: this.shop_managers_list,
                  route: "shop/add-shopmanager",
                },
              ],
            },
            {
              displayName: "Cashiers",
              displayNameIT: "Cassieri",
              displayNameCH: "收银员",
              displayNameFR: "caissiers",
              iconName: "supervised_user_circle",
              can_view: this.shop_cashiers_list,
              children: [
                {
                  displayName: "Cashiers List",
                  displayNameIT: "Elenco dei Cassieri di negozi",
                  displayNameCH: "收银员列表",
                  displayNameFR: "Liste des caissiers de magasin",
                  iconName: "format_list_bulleted",
                  can_view: this.shop_cashiers_list,
                  route: "shop/cashiers-list",
                },
                {
                  displayName: "Add New Shop cashier",
                  displayNameIT: "Aggiungi nuovo cassiere negozio",
                  displayNameCH: "新增收银员",
                  displayNameFR: "Ajouter un nouveau caissier de magasin",
                  iconName: "group_add",
                  can_view: this.add_shop_cashier,
                  route: "shop/add-cashier",
                },
              ],
            },
            {
              displayName: "Operators",
              displayNameIT: "operatori",
              displayNameCH: "操作员",
              displayNameFR: "opérateurs",
              can_view: this.shop_operators_list,
              iconName: "supervised_user_circle",
              children: [
                {
                  displayName: "Operators List",
                  displayNameIT: "elenco degli operatori",
                  displayNameCH: "操作员列表",
                  displayNameFR: "liste d'opérateurs",
                  iconName: "format_list_bulleted",
                  can_view: this.shop_operators_list,
                  route: "shop/operators-list",
                },
                {
                  displayName: "Add New  Operator",
                  displayNameIT: "Aggiungi un nuovo operatore",
                  displayNameCH: " 新增操作员",
                  displayNameFR: "Ajouter un nouvel opérateur",
                  iconName: "group_add",
                  can_view: this.add_shop_operator,
                  route: "shop/add-operator",
                },
              ],
            },
            {
              displayName: "Advertisement",
              displayNameIT: "Annuncio pubblicitario",
              displayNameCH: "广告",
              displayNameFR: "Publicité",
              iconName: "collections",
              can_view: this.advertisement,
              route: "shop/advertisement",
            },
          ],
        },
      ];
      this.navItemsWarehouse = [
        {
          displayName: "Warehouses",
          displayNameIT: "magazzino",
          displayNameCH: "货仓",
          displayNameFR: "Entrepôt",
          can_view : this.warehouse ,
          //can_view: this.warehouse,
          svgIcon: "warehouses",
          children: [
            {
              displayName: "Homepage",
              displayNameIT: "Home Page",
              displayNameCH: "主页",
              displayNameFR: "Page daccueil",
              iconName: "calendar_view_day",
              can_view : this.warehouse ,

              // can_view: this.warehouse,
              route: "shop/warehouses/homepage",
            },
            {
              displayName: "Inventory Management",
              displayNameIT: "Gestione del Inventario",
              displayNameCH: "预录盘点",
              displayNameFR: "Gestion d'Inventaire",
              iconName: "assignment",
              can_view: this.inventory_management,
              route: "shop/inventory",
            },
            {
              displayName: "Inventory History",
              displayNameIT: "Storia del Inventario",
              displayNameCH: "盘点历史",
              displayNameFR: "Historique d'Inventaire",
              iconName: "receipt_long",
              can_view: this.inventory_history,
              route: "shop/inventory-history",
            },
            {
              displayName: "Stock Management",
              displayNameIT: "Gestione delle scorte",
              displayNameCH: "库存管理",
              displayNameFR: "Gestion de stock",
              iconName: "store",
              can_view: this.stock_management,
              route: "shop/stock-management",
            },
            {
              displayName: "Warehouse Management",
              displayNameIT: "Gestione del magazzino",
              displayNameCH: "仓库管理",
              displayNameFR: "Gestion d`'Entrepôts",
              iconName: "settings",
              can_view: this.warehouse_management,
              route: "shop/warehouse-management",
            },
            {
              displayName: "Returned Goods",
              displayNameIT: "Beni restituiti",
              displayNameCH: "退货",
              displayNameFR: "Produits retournés",
              iconName: "rule",
              can_view: this.returned_goods,
              route: "shop/returned-goods",
            },
          ],
        },
      ];
      this.navItemsAccount = [
        {
          displayName: "User Account",
          displayNameIT: "Il mio account",
          displayNameCH: "我的帐户",
          displayNameFR: "Mon compte",
          iconName: "assignment_ind",
          can_view: this.my_account,
          route: "shop/useraccount",
        },
      ];
    });
  }
  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  showPopperContent() {
    if (this.mobileQuery.matches) {
      this.route.navigate(["/shop/purchase"]);
    } else {
      this.popperContent.show();
    }
  }
  logoutUser() {
    localStorage.removeItem("token");
    this.route.navigate(["/login"]);
  }
  getBasketLength() {
    const _basket = JSON.parse(localStorage.getItem("Basket"));
    if (_basket) {
      const _basketLength = _basket.length;
      const basketLength = 0;
      if (_basketLength) {
        this.basketLength = _basketLength;
      } else {
        this.basketLength = 0;
      }
    }
  }
  getBasketProducts() {
    var storedBasket = JSON.parse(localStorage.getItem("Basket"));
    if (storedBasket) {
      this.basket = storedBasket;
      this.basket.forEach((oneData) => {
        this.orderTotal += oneData.totalPrice;
      });
    }
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  backClicked() {
    this._location.back();
  }
  forwardClicked() {
    this._location.forward();
  }

  openAll() {
    const purchase = document.getElementById("purchase") as HTMLElement;
    const store = document.getElementById("store") as HTMLElement;
    const ware = document.getElementById("ware") as HTMLElement;
    store.style.display = "block";
    ware.style.display = "block";
    purchase.style.display = "block";
  }
  openPurchase() {
    const store = document.getElementById("store") as HTMLElement;
    const ware = document.getElementById("ware") as HTMLElement;
    const purchase = document.getElementById("purchase") as HTMLElement;
    store.style.display = "none";
    ware.style.display = "none";
    purchase.style.display = "block";
  }
  openStore() {
    const store = document.getElementById("store") as HTMLElement;
    const purchase = document.getElementById("purchase") as HTMLElement;
    const ware = document.getElementById("ware") as HTMLElement;
    ware.style.display = "none";
    purchase.style.display = "none";
    store.style.display = "block";
  }
  openWarehouse() {
    const purchase = document.getElementById("purchase") as HTMLElement;
    const store = document.getElementById("store") as HTMLElement;
    const ware = document.getElementById("ware") as HTMLElement;
    ware.style.display = "block";
    store.style.display = "none";
    purchase.style.display = "none";
  }
}
