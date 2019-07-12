import { Component, OnInit } from '@angular/core';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Device, CheckRecord } from 'src/app/bean/Device';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Result, DataPage } from 'src/app/bean/Result';
import { PathUtil } from 'src/app/util/PathUtil';
import { QueryParam, Filter, CreateTime, Did } from 'src/app/bean/Param';
import { filterQueryId } from '@angular/core/src/view/util';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage implements OnInit {

  chart: Highcharts.Chart;
  device: Device;
  checkRecord: CheckRecord = new CheckRecord();
  constructor(private storage: Storage, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute, private nav: NavController, private datePipe: DatePipe) { 
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.device = JSON.parse(params['device']);
      this.checkRecord = this.device.checkRecord[0];
    }) 
  }
  goBack(){
    this.nav.back();
  }
  //获取设备信息
  queryDeviceInfo(){
    this.storage.get('token').then(token=>{
      let p = '{"columns": [ "id", "provinces", "city", "area", "community", "houseNum", "location"],"filter": {"id": {"eq": "'+this.device.id+'"}},"table": "DeviceModel", "token": "'+token+'"}';
      this.http.post<Result<DataPage<Device>>>(PathUtil.QUERY_URL, JSON.parse(p)).subscribe(res => {
        if(res.type === 'success' && res.data.list.length > 0){
          this.device.provinces = res.data.list[0].provinces;
          this.device.city = res.data.list[0].city;
          this.device.community = res.data.list[0].community;
          this.device.location = res.data.list[0].location;
          this.device.houseNum = res.data.list[0].houseNum;
        }
      })
    })
  }
  //查询历史记录
  queryHisRecord(startTime: number, endTime: number){
    this.storage.get("token").then(token => {
      const qp = new QueryParam();
      qp.table = 'RealTimeData';
      qp.columns = ["createTime", "deviceValue"];
      qp.filter = new Filter();
      qp.filter.createTime = new CreateTime();
      qp.filter.createTime.bt = [startTime, endTime];
      qp.filter.did = new Did();
      qp.filter.did.eq = this.device.deviceId;
      qp.token = token;
      this.http.post<Result<DataPage<string[][]>>>(PathUtil.QUERY_URL, qp).subscribe(res => {
        const records = new Array();
        if(res.type === 'success'){
          let i = 0;
          res.data.list.forEach(element => {
            const d: number[] = new Array();
            d.push(Number.parseFloat(element['createTime']) + i);
            i = i + 10000;
            d.push(Number.parseFloat(JSON.parse(element['deviceValue']).methane));
            records.push(d);
          });
          if(this.chart == null){
            this.chart = Highcharts.chart('container', {
              title: {
                text: '',
                x: -20
              },
              xAxis: {
                type: 'datetime',
                labels: {
                  formatter: function() {
                    let s = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.value);
                    return s;
                  }
                }
              },
              yAxis: {
                title: {
                  text: ''
                },
                plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
                }]
              },
              tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S',
                valueSuffix: '' //单位
              },
              series: [{
                type: 'column',
                name: '',
                zones: [{
                  value: 1,
                  color: '#4CDB3F'
                },{
                  color: '#FB4566'
                }],
                data: records,
                showInLegend: false // 设置为 false 即为不显示在图例中
              }],
              credits:{
                enabled: false // 禁用版权信息
              }
            });
          }else{
            this.chart.update({
                series: [{
                  type: 'column',
                  name: '',
                  zones: [{
                    value: 1,
                    color: '#4CDB3F'
                  },{
                    color: '#FB4566'
                  }],
                  data: records,
                  showInLegend: false // 设置为 false 即为不显示在图例中
                }]
              }
            )
          }
        }
      })
    })
  }
  segmentChanged(val) {
    let d = new Date();
    let startTime: number;
    let endTime: number = d.getTime();
    if(val === 'day'){
      startTime = endTime - 24*60*60*1000;
    }else if(val === 'month'){
      startTime = endTime - 30*24*60*60*1000;
    }else{
      startTime = endTime - 365*24*60*60*1000;
    }
    this.queryHisRecord(startTime, endTime);
  }
  //设置
  toSetting(){
    this.router.navigate(['/device-setting'],{
      queryParams: {
        device: JSON.stringify(this.device)
      }
    })
  }
  //事故解除方法
  toAlarmHandle(){
    this.router.navigate(['/alarm-handle'], {
      queryParams: {
        solveMethod: this.device.solveMethod
      }
    })
  }
  //服务延保
  toGetService(){
    this.router.navigate(['/get-service'],{
      queryParams: {
        deviceId: this.device.deviceId
      }
    })
  }

  ngOnInit() {
    
  }
  ionViewDidEnter() {
    this.queryDeviceInfo();
  }
}
