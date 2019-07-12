import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Record, Result, DeviceCount } from 'src/app/bean/Result';
import { Storage } from '@ionic/storage';
import { DeviceCountParam } from 'src/app/bean/Param';
import { PathUtil } from 'src/app/util/PathUtil';
import { HttpClient } from '@angular/common/http';
declare var AMap;
@Component({
  selector: 'app-device-map',
  templateUrl: './device-map.page.html',
  styleUrls: ['./device-map.page.scss'],
})
export class DeviceMapPage {
  map: any;//地图对象
  markers: any[];//
  ifShow: boolean = false;
  constructor(public alertController: AlertController, private http: HttpClient, private storage: Storage) { 
  }

  ionViewDidEnter() {
    this.map = new AMap.Map('container', {
      resizeEnable: true //地图初始化加载定位到当前城市
      // center: [122.148304,37.425317]
    });

    // var options = {
    //   'showButton': true,//是否显示定位按钮
    //   'buttonPosition': 'LT',//定位按钮的位置
    //   /* LT LB RT RB */
    //   'buttonOffset': new AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
    //   'showMarker': true,//是否显示定位点
    //   'markerOptions':{//自定义定位点样式，同Marker的Options
    //     'offset': new AMap.Pixel(-18, -36),
    //     'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
    //   },
    //   'showCircle': true,//是否显示定位精度圈
    //   'circleOptions': {//定位精度圈的样式
    //     'strokeColor': '#0093FF',
    //     'noSelect': true,
    //     'strokeOpacity': 0.5,
    //     'strokeWeight': 1,
    //     'fillColor': '#02B0FF',
    //     'fillOpacity': 0.25
    //   }
    // }
    // AMap.plugin(["AMap.Geolocation"], function() {
    //     var geolocation = new AMap.Geolocation(options);
    //     debugger
    //     this.map.addControl(geolocation);
    //     geolocation.getCurrentPosition()
    // });

    //获取设备数量
    this.storage.get("token").then((token) => {
      const dp = new DeviceCountParam();
      dp.token = token;
      dp.type = 'Gas';
      this.http.post<Result<DeviceCount[]>>(PathUtil.DEVICE_COUNT_URL, dp).subscribe((res) => {
        //添加标记
        if(res.type == 'success'){
          res.data.forEach((dc) => {
            var markerContent = '' +
            '<div style="width:25px;height:34px;text-align:center;background: url(//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png) no-repeat;background-size: cover">' +
            '   <span style="color:white;font-size:9px">' + dc.count + '</span>' + 
            '</div>';
            ////a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png
            var marker = new AMap.Marker({
              position:  dc.location.split(','),
              content: markerContent
            });
            // marker.on('click', this.showInfo(record));
            this.map.add(marker)
          })
        }
      })
    })
    
    
}
showInfo(record: Record){
  this.ifShow = true;
  // this.record = record;
  console.log('111');
}
}
