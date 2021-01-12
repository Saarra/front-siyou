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
export type Chart3Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type Chart4Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
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
  selector: 'app-shop-products-statistics',
  templateUrl: './shop-products-statistics.component.html',
  styleUrls: ['./shop-products-statistics.component.scss']
})
export class ShopProductsStatisticsComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("chart2", { static: false }) chart2: ChartComponent;
  @ViewChild("chart3", { static: false }) chart3: ChartComponent;
  @ViewChild("chart4", { static: false }) chart4: ChartComponent;
  @ViewChild("chart5", { static: false }) chart5: ChartComponent;
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
    var ToDate = new Date();
    var FromData = new Date(ToDate.getFullYear(), ToDate.getMonth(), ToDate.getDate() - 7);
    this.onGetQuantproducts(this.chain_id, FromData, ToDate);
    this.onGettopproducts(this.chain_id, FromData, ToDate, 5)
    this.onGettopproductsCat(this.chain_id, FromData, ToDate, 5)
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
      title: {
        align: "left",
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
          name: "Sales",
          data: [10, 20, 36, 80, 95, 300]
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      labels: ["2025", "2024", "2023", "2022", "2021", "2020"],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
    this.chart4Options = {
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
            position: "bottom"
          }
        }
      },
      xaxis: {
        categories: this.categories,
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
    this.chart5Options = {
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
            position: "bottom"
          }
        }
      },
      xaxis: {
        categories: this.categories,
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
  onGetQuantproducts(chain_id, FromData, ToData) {
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
    this.productService.getStatProdQuant(prod).subscribe(
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
  SeriesTop;
  categoriesTop;
  productList;
  productData;
  onGettopproducts(chain_id, FromData, ToData, _top) {
    this.SeriesTop = [];
    this.categoriesTop = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      chain_id: chain_id,
      store_id: this.store_id,
      top: _top
    };
    this.productService.getStatTopProd(prod).subscribe(
      (res) => {
        this.productList = res;
        this.productData = this.productList.data;
        this.productData.forEach(element => {
          this.SeriesTop.push(element.total_sales),
            this.categoriesTop.push(element.product_name)
        });
        this.chart4Options = {
          ...this.chart4Options,
          ...{
            series: [
              {
                name: "Top",
                data: this.SeriesTop,
              },
            ],
            xaxis: {
              categories: this.categoriesTop,
            },
          },
        };
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  SeriesTopCat;
  categoriesTopCat;
  producList;
  producData;
  onGettopproductsCat(chain_id, FromData, ToData, _top) {
    this.SeriesTopCat = [];
    this.categoriesTopCat = [];
    var fromDate = this.datepipe.transform(FromData, "yyyy-MM-dd");
    var toDate = this.datepipe.transform(ToData, "yyyy-MM-dd");
    var prod = {
      start: fromDate,
      end: toDate,
      chain_id: chain_id,
      store_id: this.store_id,
      top: _top
    };
    this.productService.getStatTopProdCat(prod).subscribe(
      (res) => {
        //console.log(prod, res)
        this.producList = res;
        this.producData = this.producList.data;
        this.producData.forEach(element => {
          this.SeriesTopCat.push(element.total_sales),
            this.categoriesTopCat.push(element.category_name)
        });
        this.chart5Options = {
          ...this.chart5Options,
          ...{
            series: [
              {
                name: "Top",
                data: this.SeriesTopCat,
              },
            ],
            xaxis: {
              categories: this.categoriesTopCat,
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
