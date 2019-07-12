import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import * as Highcharts from 'highcharts';
import { PMHParam } from 'src/app/bean/Param';
import { HttpClient } from '@angular/common/http';
import { Result, AQI } from 'src/app/bean/Result';
import { PathUtil } from 'src/app/util/PathUtil';

@Component({
  selector: 'app-air-chart',
  templateUrl: './air-chart.page.html',
  styleUrls: ['./air-chart.page.scss'],
})
export class AirChartPage implements OnInit {

  title: string;
  cityId: number;
  type: string;
  chart: Highcharts.Chart;
  token: string;
  datas: number[] = new Array();
  constructor(private activedRoute: ActivatedRoute, private nav: NavController, private http: HttpClient) { 
    activedRoute.queryParams.subscribe( (params: Params) => {
        this.title = params['title'];
        this.cityId = params['cityId'];
        this.type = params['type'];
        this.token = params['token'];
        const d = new Date();
        this.getPMHis(d.getTime() - 24*60*60*1000, d.getTime());
    })
  }
  segmentChanged(val){
    console.log(val);
  }
  getPMHis(startTime: number, endTime: number){
    //获取PM历史数据
    const pmparam = new PMHParam();
    pmparam.cityId = this.cityId;
    pmparam.token = this.token;
    pmparam.startTime = startTime
    pmparam.endTime = endTime;
    debugger;
    this.http.post<Result<AQI[]>>(PathUtil.WEATHER_PM_HISTORY, pmparam).subscribe((res) => {
      if(res.type === 'success'){
        res.data.forEach( aqi => {
          if(this.type === 'aqi'){
            this.datas.push(aqi.value);
          }else if(this.type === 'pm25'){
            this.datas.push(aqi.pm25);
          }else if(this.type === 'pm10'){
            this.datas.push(aqi.pm10);
          }else if(this.type === 'so2'){
            this.datas.push(aqi.so2);
          }else if(this.type === 'no2'){
            this.datas.push(aqi.no2);
          }else if(this.type === 'co'){
            this.datas.push(aqi.co);
          }else if(this.type === 'o3'){
            this.datas.push(aqi.o3);
          }
        })
        if(this.datas.length == 0){
          var i = 10; 
          while(i < 500){
            this.datas.push(i);
            i = i + 20;
          }
        }
        this.initChart()
      }
      
    });
  }
  initChart(){
    this.chart = Highcharts.chart('container', {
      title: {
        text: '',
        x: -20
      },
      subtitle: {
        text: '',
        x: -20
      },
      xAxis: {
        labels: {
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
        }
      },
      // 柱子之间的间距 及 分组之间的间距
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        }
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S',
        valueSuffix: '' //单位
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
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
        data: this.datas,
        showInLegend: false // 设置为 false 即为不显示在图例中
      }],
      credits:{
        enabled: false // 禁用版权信息
      }
    });
  }
  goBack(){
    this.nav.back();
  }
  ngOnInit() {
  }

}
