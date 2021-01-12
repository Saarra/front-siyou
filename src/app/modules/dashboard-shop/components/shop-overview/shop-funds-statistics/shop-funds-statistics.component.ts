import { Component, OnInit, ViewChild } from "@angular/core";
import { ChainService } from "src/app/shared/services/chain.service";
import { DatePipe, formatDate } from "@angular/common";
formatDate(new Date(), "yyyy/MM/dd", "en");
import { CategoriesService } from "src/app/shared/services/categories.service";
import { FundsS2cService } from "src/app/shared/services/funds-s2c.service";
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
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};
export type Chart2Options = {
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
  selector: "app-shop-funds-statistics",
  templateUrl: "./shop-funds-statistics.component.html",
  styleUrls: ["./shop-funds-statistics.component.scss"],
})
export class ShopFundsStatisticsComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("chart2", { static: false }) chart2: ChartComponent;
  series: ApexAxisChartSeries;
  public chartOptions: Partial<ChartOptions>;
  public chart2Options: Partial<Chart2Options>;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
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
    private fundsS2cService: FundsS2cService,
    private chainService: ChainService,
    public translate: TranslateService,

  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.onGetChainsList();
    var last = new Date();
    var first = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate() - 6
    );
    var firstPur = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate() - 30
    );
    this.onGetfunds(this.chain_id, first, last, "days");
    this.onGetfundsPurchased(this.chain_id, firstPur, last, "chain")
    this.chartOptions = {
      series: [
        {
          name: "Card",
          data: this.SeriesCard
        },
        {
          name: "Check",
          data: this.SeriesCheck
        },
        {
          name: "Cash",
          data: this.SeriesCash
        }
      ],
      chart: {
        type: "bar",
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: this.categories
      }
    };
    this.chart2Options = {
      series: [
        {
          name: "Quantity",
          data: this.SeriesPur,
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
            position: "bottom"
          }
        }
      },
      xaxis: {
        categories: this.categoriesPur,
        tickPlacement: 'on',
        position: "bottom",
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
        localStorage.setItem("chainInit", this.chainData[0].id);
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
  SeriesCash = [];
  SeriesCheck = [];
  SeriesCard = [];
  categories = [];
  onGetfunds(chain_id, FromData, ToData, show) {
    this.SeriesCash = [];
    this.SeriesCheck = [];
    this.SeriesCard = [];
    this.categories = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      from: fromDate,
      to: toDate,
      chain_id: chain_id,
      store_id: this.store_id,
      show_way: show,
    };
    this.fundsS2cService.getStatFunds(prod).subscribe(
      (res) => {
        this.ordersList = res;
        this.ordersData = this.ordersList.data;
        this.ordersData.label.forEach((element) => {
          this.categories.push(element);
        });
        this.ordersData.card.forEach((el) => {
          this.SeriesCard.push(el)
        });
        this.ordersData.cash.forEach((el) => {
          this.SeriesCash.push(el)
        });
        this.ordersData.check.forEach((el) => {
          this.SeriesCheck.push(el);
        });
        //console.log(this.SeriesCard, this.SeriesCash, this.SeriesCheck);
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            series: [
              {
                name: "Card",
                data: this.SeriesCard,
              },
              {
                name: "Check",
                data: this.SeriesCheck,
              },
              {
                name: "Cash",
                data: this.SeriesCash,
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
  orderList;
  orderData;
  categoriesPur = [];
  SeriesPur = [];
  onGetfundsPurchased(chain_id, FromData, ToData, type) {
    ;
    this.SeriesPur = [];
    this.categories = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      chain_id: chain_id,
      type: type,
    };
    this.fundsS2cService.getStatFundsPur(prod).subscribe(
      (res) => {
        //console.log(res)
        this.orderList = res;
        this.orderData = this.orderList.data;
        if (!this.orderData.supplier_name) {
          this.categoriesPur.push(this.orderData[0].chain_name)
        } else {
          this.categoriesPur.push(this.orderData[0].supplier_name)
        }
        this.SeriesPur.push(this.orderData[0].total_amount)
        //console.log(this.SeriesPur, this.categoriesPur);
        this.chart2Options = {
          ...this.chartOptions,
          ...{
            series: [
              {
                name: "Purchase Fund",
                data: this.SeriesPur,
              }
            ],
            xaxis: {
              categories: this.categoriesPur,
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
