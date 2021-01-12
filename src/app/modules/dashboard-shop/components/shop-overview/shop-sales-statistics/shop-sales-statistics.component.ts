import { Component, OnInit, ViewChild } from "@angular/core";
import { ChainService } from "src/app/shared/services/chain.service";
import { DatePipe, formatDate } from '@angular/common';
formatDate(new Date(), 'yyyy/MM/dd', 'en'); import { CategoriesService } from "src/app/shared/services/categories.service";
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
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
  ApexMarkers
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
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
export type Chart3Options = {
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
  selector: 'app-shop-sales-statistics',
  templateUrl: './shop-sales-statistics.component.html',
  styleUrls: ['./shop-sales-statistics.component.scss']
})
export class ShopSalesStatisticsComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("chart2", { static: false }) chart2: ChartComponent;
  @ViewChild("chart3", { static: false }) chart3: ChartComponent;
  @ViewChild("chart4", { static: false }) chart4: ChartComponent;
  series: ApexAxisChartSeries;
  public chartOptions: Partial<ChartOptions>;
  public chart2Options: Partial<Chart2Options>;
  public chart3Options: Partial<Chart3Options>;
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
  constructor(
    public datepipe: DatePipe,
    private categoriesService: CategoriesService,
    private productService: ProductsS2cService,
    private chainService: ChainService,
  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.onGetChainsList();
    var last = new Date();
    var first = new Date(last.getFullYear(), last.getMonth(), last.getDate() - 7);
    this.onGetSalesTurnover(this.chain_id, first, last)
    this.onGetgrossProfit(this.chain_id, first, last)
    this.linechart = true;
    this.chartOptions = {
      series: [
        {
          name: "Turnover",
          data: this.Series,
        },
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
      xaxis: {
        categories: this.categories,
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
          name: "Sales",
          data: this.Series
        },
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
        categories: this.categories
      },
    };
    this.chart3Options = {
      series: [
        {
          name: "Profit",
          data: [10, 20]
        },
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "bottom"
          }
        }
      },
      xaxis: {
        categories: this.categoriesB,
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
  productsList;
  productsData;
  Series = [];
  categories = [];
  onGetSalesTurnover(chain_id, FromData, ToData) {
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
    this.productService.getStatSalesTurnover(prod).subscribe(
      (res) => {
        this.productsList = res;
        this.productsData = this.productsList.data;
        this.productsData.days.forEach(element => {
          this.Series.push(element.total),
            this.categories.push(element.period)
        });
        this.chart2Options = {
          ...this.chart2Options,
          ...{
            series: [
              {
                name: "Turnover",
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
                name: "Turnover",
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
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  barchart = false;
  linechart = true;
  barChart() {
    this.barchart = true;
    this.linechart = false;
  }
  lineChart() {
    this.linechart = true;
    this.barchart = false;
  }
  SeriesB = [];
  categoriesB = [];
  productList;
  productData;
  onGetgrossProfit(chain_id, FromData, ToData) {
    this.SeriesB = [];
    this.categoriesB = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      chain_id: chain_id,
      store_id: this.store_id
    };
    this.productService.getStatSalesProfit(prod).subscribe(
      (res) => {
        this.productList = res;
        this.productData = this.productList.data;
        this.productData.days.forEach(element => {
          this.SeriesB.push(element.total),
            this.categoriesB.push(element.period)
        });
        this.chart3Options = {
          ...this.chart3Options,
          ...{
            series: [
              {
                name: "Profit",
                data: [10, 20],
              },
            ],
            xaxis: {
              categories: this.categoriesB,
            },
          },
        };
      },
      (err) => {
        console.log(err);;
      }
    );
  }
}
