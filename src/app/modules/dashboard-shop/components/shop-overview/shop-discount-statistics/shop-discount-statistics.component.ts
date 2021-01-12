import { Component, OnInit, ViewChild } from "@angular/core";
import { ChainService } from "src/app/shared/services/chain.service";
import { DatePipe, formatDate } from '@angular/common';
formatDate(new Date(), 'yyyy/MM/dd', 'en'); import { CategoriesService } from "src/app/shared/services/categories.service";
import { DiscountService } from "src/app/shared/services/discount.service";
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
@Component({
  selector: 'app-shop-discount-statistics',
  templateUrl: './shop-discount-statistics.component.html',
  styleUrls: ['./shop-discount-statistics.component.scss']
})
export class ShopDiscountStatisticsComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("chart2", { static: false }) chart2: ChartComponent;
  @ViewChild("chart3", { static: false }) chart3: ChartComponent;
  @ViewChild("chart4", { static: false }) chart4: ChartComponent;
  series: ApexAxisChartSeries;
  public chartOptions: Partial<ChartOptions>;
  public chart2Options: Partial<Chart2Options>;
  public chart3Options: Partial<Chart3Options>;
  public chart4Options: Partial<Chart4Options>;
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
    private discountService: DiscountService,
    private chainService: ChainService,
  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.onGetChainsList();
    var first = new Date();
    var last = new Date(first.getFullYear(), first.getMonth(), first.getDate() - 30);
    this.from = this.datepipe.transform(last, 'yyyy-MM-dd')
    this.situation = this.datepipe.transform(first, 'yyyy-MM-dd')
    this.onGetQuantdiscount(this.chain_id, this.from, this.situation)
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
  onGetQuantdiscount(chain_id, FromData, ToData) {
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
    this.discountService.getStatdiscountQuantity(prod).subscribe(
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
}
