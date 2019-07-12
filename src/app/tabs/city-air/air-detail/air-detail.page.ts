import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';
import { Forecast, Result, ResPM, AQI, Weather } from 'src/app/bean/Result';
import { Storage } from '@ionic/storage';
import { PMParam, PMHParam } from 'src/app/bean/Param';
import * as Highcharts from 'highcharts';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-air-detail',
  templateUrl: './air-detail.page.html',
  styleUrls: ['./air-detail.page.scss'],
})
export class AirDetailPage {

  cityId: number;
  air: Forecast = new Forecast();;
  aqi: AQI = new AQI();
  forecasts: Forecast[] = new Array();
  forecast: Forecast = new Forecast();
  isLoad: boolean = false;
  aqihis: AQI[] = new Array();
  chartAQI: Highcharts.Chart;
  chartPM25: Highcharts.Chart;
  chartPM10: Highcharts.Chart;
  chartSO2: Highcharts.Chart;
  chartNO2: Highcharts.Chart;
  chartCO: Highcharts.Chart;
  chartO3: Highcharts.Chart;
  token: string;
  weekday: string[] = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  three: string;
  four: string;
  five: string;
  six: string;
  days: string[];
  constructor(private activedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private storage: Storage, private nav: NavController) { 
    var d = new Date();
    var day = d.getDay();
    this.three = this.weekday[(day + 3)%7];
    this.four = this.weekday[(day + 4)%7];
    this.five = this.weekday[(day + 5)%7];
    this.six = this.weekday[(day + 6)%7];
    this.days = new Array();
    var i = 0;
    this.days.push((d.getMonth() + 1) + '-' + d.getDate());
    while(i < 6){
      d = new Date(d.getTime() + 24*60*60*1000);
      this.days.push((d.getMonth() + 1) + '-' + d.getDate());
      i = i + 1;
    }
  }
  goBack(){
    this.nav.back();
  }

  //跳转至空气质量报表
  toAirChart(title: string, type: string){
    this.router.navigate(['/air-chart'], {
      queryParams: {
       title: title,
       cityId: this.cityId,
       type: type,
       token: this.token
      }
    })
  }

  ionViewDidEnter() {
    this.activedRoute.queryParams.subscribe( (params: Params) => {
      this.cityId = params['cityId'];
      this.storage.get("token").then( (token) => {
        this.token = token;
        const param = new PMParam();
          param.cityId = this.cityId;
          param.token = token;
          //获取城市天气
          this.http.post<Result<ResPM>>(PathUtil.WEATHER_PM_URL, param).subscribe( (res) => {
              this.aqi = res.data.aqi;
              this.forecasts = res.data.weather.forecast
              this.forecast = this.forecasts[0];
              const day: number[] = new Array();
              const night: number[] = new Array();
              this.forecasts.forEach( (f) => {
                day.push(Number.parseFloat(f.tempDay));
                night.push(Number.parseFloat(f.tempNight));
              })
              debugger;
              this.initWeatherChart(day, night);
          })
          //获取PM历史数据
          const pmparam = new PMHParam();
          pmparam.cityId = this.cityId;
          pmparam.token = token;
          const d = new Date();
          pmparam.startTime = d.getTime() - 24*60*60*1000;
          pmparam.endTime = d.getTime() - 24*60*60*1000;
          this.http.post<Result<AQI[]>>(PathUtil.WEATHER_PM_HISTORY, pmparam).subscribe((res) => {
            if(res.type == 'success'){
              this.aqihis = res.data;
              const aqidata = new Array();
              const pm25data = new Array();
              const pm10data = new Array();
              const so2data = new Array();
              const no2data = new Array();
              const codata = new Array();
              const o3data = new Array();
              this.aqihis.forEach( aqi => {
                aqidata.push(aqi.value);
              })
              if(aqidata.length == 0){
                var i = 10; 
                while(i < 500){
                  aqidata.push(i);
                  pm25data.push(i);
                  pm10data.push(i);
                  so2data.push(i);
                  no2data.push(i);
                  codata.push(i);
                  o3data.push(i);
                  i = i + 20;
                }
              }
              //初始化图表
              this.initChart(this.chartAQI, 'aqi_container', aqidata);
              this.initChart(this.chartPM25, 'pm25_container', pm25data);
              this.initChart(this.chartPM10, 'pm10_container', pm10data);
              this.initChart(this.chartSO2, 'so2_container', so2data);
              this.initChart(this.chartNO2, 'no2_container', no2data);
              this.initChart(this.chartCO, 'co_container', codata);
              this.initChart(this.chartO3, 'o3_container', o3data);
            }
          })
      })
  })
  }

  initWeatherChart(day: number[], night: number[]){
  // 图表初始化函数
  var chart = Highcharts.chart('weather_container', {
    chart: {
        type: 'spline'                          //指定图表的类型，默认是折线图（line）
    },
    title: {
        text: ''                 // 标题
    },
    xAxis: {
      labels: {
        enabled: false
      },
      tickWidth: 0,
      tickColor: 'white',
      tickLength: 0
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0
    }, 
    plotOptions: {
      spline: {
          dataLabels: {
              // 开启数据标签
              enabled: true,
              format: "{y}°C"
          },
          // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          enableMouseTracking: false
      }
    },
    tooltip: {
      enabled: false
    },
    series: [{
      type: 'spline',
      name: '',
      data: day,
      zones: [{
        color: '#FFCA0A'
      }],
      showInLegend: false // 设置为 false 即为不显示在图例中
    },
    {
      type: 'spline',
      name: '',
      data: night,
      zones: [{
        color: '#3165EC'
      }],
      showInLegend: false // 设置为 false 即为不显示在图例中
    }],
    credits:{
      enabled: false // 禁用版权信息
    }
});
  }

  initChart(chart:Highcharts.Chart, chartId: string, data: number[]){
    chart = Highcharts.chart(chartId, {
      title: {
        text: '',
        x: -20
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickWidth: 0,
        tickColor: 'white',
        tickLength: 0
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0
      },
      tooltip: {
        enabled: false
      },
      // 柱子之间的间距 及 分组之间的间距
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false,
          dataLabels: {
            inside: false
          }
        }
      },
      series: [{
        type: 'column',
        name: '',
        zones: [{
          value: 50,
          color: '#3165EC'
        },{
          value: 100,
          color: '#4CDB3F'
        },{
          value: 150,
          color: '#FACE3C'
        },{
          value: 200,
          color: '#FA7449'
        },{
          value: 300,
          color: '#A930B5'
        },{
          color: '#A930B5'
        }],
        data: data,
        showInLegend: false // 设置为 false 即为不显示在图例中
      }],
      credits:{
        enabled: false // 禁用版权信息
      }
    });
  }
  switchColor(val: number){
    if(val < 51){
      return 
    }
  }

}
