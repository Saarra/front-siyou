import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  name;
  email;
  image;
  lastname;
  title = 'templatetestangular';
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ch', label: 'हिंदी' },
    { code: 'fr', label: 'French' }];
  mobileQuery: MediaQueryList;
  navItems: Array<any> = [
    {
      displayName: 'Dashboard',
      displayNameIT: 'Pannello Di Controllo',
      displayNameCH: '仪表板',
      displayNameFR: 'Tableau de bord',
      can_view: 1,
      iconName: 'vertical_split',
      route: 'overview'
    },
    {
      displayName: 'My Products',
      displayNameIT: 'I Miei Prodotti',
      displayNameCH: '我的产品',
      displayNameFR: 'Mes produits',
      can_view: 1,
      iconName: 'widgets',
      children: [
        {
          displayName: 'Products Overview',
          displayNameIT: 'Panoramica Dei Prodotti',
          displayNameCH: '产品总览',
          displayNameFR: 'Aperçu des produits',
          can_view: 1,
          iconName: 'settings_overscan',
          route: 'dashboard/products',
        },
        {
          displayName: 'Add New Product',
          displayNameIT: 'Aggiungi Nuovo Prodotto',
          displayNameCH: '添加新产品',
          displayNameFR: 'Ajouter un nouveau produit',
          can_view: 1,
          iconName: 'playlist_add',
          route: 'dashboard/add-product',
        },
        {
          displayName: 'Product List',
          displayNameIT: 'Elenco Dei Prodotti',
          displayNameCH: '产品列表',
          displayNameFR: 'Liste de produits',
          can_view: 1,
          iconName: 'format_list_bulleted',
          route: 'dashboard/products-list',
        }
      ]
    },
    {
      displayName: 'Discounts Management',
      displayNameIT: 'Gestione Degli Sconti',
      displayNameCH: '折扣管理',
      displayNameFR: 'Gestion des remises',
      can_view: 1,
      iconName: 'monetization_on',
      children: [{
        displayName: 'Discount',
        displayNameIT: 'Sconto Sugli Effetti',
        displayNameCH: '设置折扣',
        displayNameFR: 'Affecter la remise',
        can_view: 1,
        iconName: 'local_atm',
        route: 'discounts'
      },
      {
        displayName: 'Discounts List',
        displayNameIT: 'Elenco Sconti',
        displayNameCH: '折扣清单',
        displayNameFR: 'Liste des remises',
        can_view: 1,
        iconName: 'list_alt',
        route: 'discounts-list'
      }
      ]
    },
    {
      displayName: 'Orders Management',
      displayNameIT: 'Gestione Degli Ordini',
      displayNameCH: '订单管理',
      displayNameFR: 'Gestion des commandes',
      can_view: 1,
      svgIcon: 'orders',
      children: [
        {
          displayName: 'Valid Orders',
          displayNameIT: 'Ordini validi',
          displayNameCH: '有效订单',
          displayNameFR: 'Commandes valides',
          can_view: 1,
          iconName: 'offline_pin',
          route: 'dashboard/valid-orders'
        },
        {
          displayName: 'Invalid Orders',
          displayNameIT: 'Ordini Non Validi',
          displayNameCH: '无效的订单',
          displayNameFR: 'Commandes non valides',
          can_view: 1,
          iconName: 'privacy_tip',
          route: 'dashboard/invalid-orders'
        },
        {
          displayName: 'Paid Orders',
          displayNameIT: 'Ordini Pagati',
          displayNameCH: '已付订单',
          displayNameFR: 'Commandes payées',
          can_view: 1,
          iconName: 'ballot',
          route: 'dashboard/paid-orders'
        }
      ]
    },
    {
      displayName: 'Commission Management',
      displayNameIT: 'Gestione Della Commissione',
      displayNameCH: '佣金管理',
      displayNameFR: 'Gestion des commissions',
      can_view: 1,
      iconName: 'redeem',
      children: [
        {
          displayName: 'Shop Commission List',
          displayNameIT: 'Elenco Delle Commissioni Del Negozio',
          displayNameCH: '店铺佣金列表',
          displayNameFR: 'Liste des commissions',
          iconName: 'speaker_notes',
          route: 'shop-commission-list',
          can_view: 1,

        },
        {
          displayName: 'Products Commission List',
          displayNameIT: 'Elenco Di Prodotti Della Commissione',
          displayNameCH: '产品佣金清单',
          displayNameFR: 'Liste des commissions de produits',
          can_view: 1,
          iconName: 'view_list',
          route: 'products-commission-list'
        },
        {
          displayName: 'Add Shop Commission',
          displayNameIT: 'Aggiungi commissione negozio',
          displayNameCH: '添加商店佣金',
          displayNameFR: 'Ajouter une commission de boutique',
          can_view: 1,
          iconName: 'addchart',
          route: 'add-shop-commission'
        },
        {
          displayName: 'Add Products Commission',
          displayNameIT: 'Aggiungi prodotti Commissione',
          displayNameCH: '添加产品佣金',
          displayNameFR: 'Ajouter des produits Commission',
          can_view: 1,
          iconName: 'post_add',
          route: 'add-product-commission'
        },
      ]
    },
    {
      displayName: 'Sales Managers Management',
      displayNameIT: 'Gestione Dei Responsabili Delle Vendite',
      displayNameCH: '销售经理管理',
      displayNameFR: 'Gestion des directeurs des ventes',
      can_view: 1,
      iconName: 'people',
      children: [
        {
          displayName: 'My Sales managers',
          displayNameIT: 'I Miei Responsabili Delle Vendite',
          displayNameCH: '我的销售经理',
          displayNameFR: 'Mes directeurs commerciaux',
          can_view: 1,
          iconName: 'account_circle',
          route: 'dashboard/salesmanager',
        },
      ]
    },
    {
      displayName: 'Accounts Management',
      displayNameIT: 'Gestione Degli Account',
      displayNameCH: '账户管理',
      displayNameFR: 'Gestion des comptes',
      can_view: 1,
      iconName: 'admin_panel_settings',
      children: [
        {
          displayName: 'Manage Workers Accounts',
          displayNameIT: 'Gestisci Gli Account Dei Lavoratori',
          displayNameCH: '管理工人账户',
          displayNameFR: 'Gérer les comptes des travailleurs',
          can_view: 1,
          iconName: 'supervised_user_circle',
          route: 'dashboard/supplier-account-management'
        }
      ]
    },
    {
      displayName: 'Funds',
      displayNameIT: 'Fondi',
      displayNameCH: '资金',
      displayNameFR: 'Fonds',
      can_view: 1,
      svgIcon: 'funds',
      children: [
        {
          displayName: 'Sales Funds',
          displayNameIT: 'Fondi di Vendita',
          displayNameCH: '销售资金',
          displayNameFR: 'Fonds de Vente',
          can_view: 1,
          iconName: 'payments',
          route: 'funds/sales-funds'
        },
        {
          displayName: 'Purchased Funds',
          displayNameIT: 'Fondi Acquistati',
          displayNameCH: '购入资金',
          displayNameFR: 'Fonds Achetés',
          can_view: 1,
          iconName: 'money',
          route: 'funds/purchased-funds'
        },
        {
          displayName: 'Payment Methods',
          displayNameIT: 'Modalità di Pagamento',
          displayNameCH: '支付方法',
          displayNameFR: 'Méthodes de Payement',
          can_view: 1,
          iconName: 'fact_check',
          route: 'funds/payment-methods'
        }
      ]
    },
    {
      displayName: 'Warehouses',
      displayNameIT: 'magazzini',
      displayNameCH: '货仓',
      displayNameFR: 'Entrepôts',
      can_view: 1,
      svgIcon: 'warehouses',
      children: [
        {
          displayName: 'Homepage',
          displayNameIT: 'Home Page',
          displayNameCH: '主页',
          displayNameFR: 'Page daccueil',
          iconName: 'calendar_view_day',
          can_view: 1,
          route: 'homepage-warehouse'
        },
        {
          displayName: 'Inventory Management',
          displayNameIT: 'Gestione del Inventario',
          displayNameCH: '预录盘点',
          displayNameFR: 'Gestion d\'Inventaire',
          iconName: 'assignment',
          can_view: 1,
          route: 'inventory-management'
        },
        {
          displayName: 'Stock Management',
          displayNameIT: 'Gestione delle scorte',
          displayNameCH: '库存管理',
          displayNameFR: 'Gestion de stock',
          iconName: 'store',
          can_view: 1,
          route: 'stock-management'
        },
        {
          displayName: 'Warehouse Management',
          displayNameIT: 'Gestione del magazzino',
          displayNameCH: '仓库管理',
          displayNameFR: 'Gestion d`\'Entrepôts',
          iconName: 'settings',
          can_view: 1,
          route: 'warehouse-management',
        },
      ]
    }
  ];
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  private mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: Router,
    public translate: TranslateService,
    private _location: Location
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 2400px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    translate.addLangs(['English', 'Italian', 'Chinese']);
  }
  ngOnInit() {
    this.name = localStorage.getItem('first_name')
    this.lastname = localStorage.getItem('last_name')
    this.image = localStorage.getItem('img_url')
    this.email = localStorage.getItem('userEmail')
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
  backClicked() {
    this._location.back();
  }
  forwardClicked() {
    this._location.forward();
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
