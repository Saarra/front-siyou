import { Component, OnInit, ViewChild } from "@angular/core";
import { ChainService } from "src/app/shared/services/chain.service";
import { DatePipe, formatDate } from '@angular/common';
formatDate(new Date(), 'yyyy/MM/dd', 'en'); import { CategoriesService } from "src/app/shared/services/categories.service";
import { OrderServiceService } from "src/app/shared/services/order-service.service";
import { ShopcachierService } from "src/app/shared/services/shopCachier.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexGrid,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";
declare var $: any;
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
export type Chart2Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
export type Chart4Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
export type Chart3Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
export type Chart5Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-shop-orders-statistics',
  templateUrl: './shop-orders-statistics.component.html',
  styleUrls: ['./shop-orders-statistics.component.scss']
})
export class ShopOrdersStatisticsComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("chart2", { static: false }) chart2: ChartComponent;
  @ViewChild("chart3", { static: false }) chart3: ChartComponent;
  @ViewChild("chart4", { static: false }) chart4: ChartComponent;
  @ViewChild("chart5", { static: false }) chart5: ChartComponent;
  @ViewChild("chart6", { static: false }) chart6: ChartComponent;
  series: ApexAxisChartSeries;
  public chartOptions: Partial<ChartOptions>;
  public chart2Options: Partial<Chart2Options>;
  public chart3Options: Partial<Chart3Options>;
  public chart4Options: Partial<Chart4Options>;
  public chart5Options: Partial<Chart5Options>;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  formData: any;
  form: any;
  formProd;
  formProdData;
  from;
  to;
  situation;
  store_id = parseInt(localStorage.getItem("store_id"));
  chain_id = parseInt(localStorage.getItem("chainInit"));
  cashierInit = parseInt(localStorage.getItem("cashierInit"));
  constructor(
    public datepipe: DatePipe,
    private categoriesService: CategoriesService,
    private orderService: OrderServiceService,
    private chainService: ChainService,
    private ShopcachierService: ShopcachierService
  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.onGetChainsList();
    this.getShopcachiersList();
    var first = new Date();
    var last = new Date(first.getFullYear(), first.getMonth(), first.getDate() - 7);
    this.onGetQuantorders(this.chain_id, last, first)
    this.onGetAmountorders(last, first),
      this.onGetAmountordersCashier(last, first, this.chain_id, this.cashierInit);
    //console.log(last, first, this.chain_id, this.cashierInit)
    this.chartOptions = {
      series: [
        {
          name: "Quantity",
          data: this.Series,
        },
      ],
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      xaxis: {
        categories: this.categories,
        tickPlacement: 'on',
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
        }
      },
    };
    this.chart2Options = {
      series: [
        {
          name: "Quantity",
          data: this.Series,
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.categories,
      },
    };
    this.chart3Options = {
      series: [
        {
          name: "series1",
          data: this.Series2
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: this.categories2,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.chart4Options = {
      series: [
        {
          name: "basic",
          data: this.Series2
        }
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.categories2,
      },
    };
    this.chart5Options = {
      series: [
        {
          name: "Amount By Cashier",
          data: this.Series3
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: this.categories3,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      },
    };
    this.getCategoriesList();
  }
  chainsList;
  chainData;
  chainInit;
  onGetChainsList() {
    return this.chainService.getChainsList().subscribe(
      (res) => {
        this.chainsList = res;
        this.chainData = this.chainsList.data;
        this.chainInit = this.chainData[0].id;
        localStorage.setItem('chainInit', this.chainData[0].id);
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  categoriesList;
  categoryData;
  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categoriesList = res;
      this.categoryData=this.categoriesList.data;

    });
  }
  ordersList;
  ordersData;
  Series = [];
  categories = [];
  onGetQuantorders(chain_id, FromData, ToData) {
    this.Series = [];
    this.categories = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      chain_id: chain_id,
      store_id: this.store_id
    };
    this.orderService.getStatOrderQuantity(prod).subscribe(
      (res) => {
        //console.log(res)
        this.ordersList = res;
        this.ordersData = this.ordersList.data;
        this.ordersData.days.forEach(element => {
          this.Series.push(element.total),
            this.categories.push(element.period)
        });
        this.chart2Options = {
          ...this.chart2Options,
          ...{
            series: [
              {
                name: "Quantity",
                data: this.Series,
              },
            ],
            xaxis: {
              categories: this.categories,
            },
          },
        };
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            series: [
              {
                name: "Quantity",
                data: this.Series,
              },
            ],
            xaxis: {
              categories: this.categories,
            },
          },
        };
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  barchart2 = false;
  linechart = true;
  lineChart() {
    this.linechart = true;
    this.barchart2 = false;
  }
  barChart2() {
    this.linechart = false;
    this.barchart2 = true;
  }
  barchart = true;
  areachart = false;
  barChart() {
    this.barchart = true;
    this.areachart = false;
  }
  AreaChart() {
    this.areachart = true;
    this.barchart = false;
  }
  Series2 = [];
  categories2 = [];
  onGetAmountorders(FromData, ToData) {
    this.Series2 = [];
    this.categories2 = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      store_id: this.store_id,
    };
    this.orderService.getStatOrderAmount(prod).subscribe(
      (res) => {
        this.ordersList = res;
        this.ordersData = this.ordersList.data;
        //console.log(res)
        this.ordersData.days.forEach(element => {
          this.Series2.push(element.income),
            this.categories2.push(element.period)
        });
        this.chart4Options = {
          ...this.chart4Options,
          ...{
            series: [
              {
                name: "Amount",
                data: this.Series2,
              },
            ],
            xaxis: {
              categories: this.categories2,
            },
          },
        };
        this.chart3Options = {
          ...this.chart3Options,
          ...{
            series: [
              {
                name: "Amount",
                data: this.Series2,
              },
            ],
            xaxis: {
              categories: this.categories2,
            },
          },
        };
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  Series3 = [];
  categories3 = [];
  onGetAmountordersCashier(FromData, ToData, chain_id, cachier_id) {
    this.Series3 = [];
    this.categories3 = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      store_id: this.store_id,
      chain_id: chain_id,
      cachier_id: cachier_id
    };
    this.orderService.getStatOrderAmountCashier(prod).subscribe(
      (res) => {
        this.ordersList = res;
        //console.log(res)
        this.ordersData = this.ordersList.data;
        this.ordersData.days.forEach(element => {
          this.Series3.push(element.income),
            this.categories3.push(element.period)
        });
        this.chart5Options = {
          ...this.chart5Options,
          ...{
            series: [
              {
                name: "Amount By Cashier",
                data: this.Series3,
              },
            ],
            xaxis: {
              categories: this.categories3,
            },
          },
        };
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  cachiersList;
  shopcachiersData;
  shopcachiersList;
  getShopcachiersList() {
    return this.ShopcachierService.getcachiersList().subscribe(
      res => {
        this.shopcachiersList = res;
        localStorage.setItem(this.shopcachiersList[0].id, 'cashierInit')
      }, err => {
        console.log(err);;
      }
    );
  }
  barchart3 = true;
  areachart3 = false;
  barChart3() {
    this.barchart3 = true;
    this.areachart3 = false;
  }
  AreaChart3() {
    this.areachart3 = true;
    this.barchart3 = false;
  }
}
