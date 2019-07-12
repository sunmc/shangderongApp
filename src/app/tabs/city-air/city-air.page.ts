import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PMParam, QueryParam, Filter } from 'src/app/bean/Param';
import { Result, ResPM, City, AQI, Carousel, DataPage } from 'src/app/bean/Result';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-city-air',
  templateUrl: './city-air.page.html',
  styleUrls: ['./city-air.page.scss'],
})
export class CityAirPage {

  citys: City[] = new Array();
  mycitys: City[] = new Array();
  aqis: AQI[] = new Array();
  day: string;
  carousels: Carousel[] = new Array();
  constructor(private http: HttpClient, private datePipe: DatePipe, private router: Router, private storage: Storage, private iab: InAppBrowser, private alertController: AlertController) {
    this.http.get<City[]>('../../assets/city.json')
          .subscribe((data) => {
            this.citys = data;
          });
    const d = new Date();
    this.day = this.datePipe.transform(d, 'yyyy.MM.dd');
   }

   //页面加载完成事件
   ionViewDidEnter(){
     this.storage.get("checkdCityList").then((checkdCityList) => {
        this.mycitys = checkdCityList;
        if(this.mycitys && this.mycitys.length > 0){
          this.getPM();
        }
     })
     this.getBanner();
   }

   //获取城市空气质量信息
   getPM(){
    // 101120201
    this.storage.get("token").then( (token) => {
      this.mycitys.forEach( (city) => {
        const param = new PMParam();
        param.cityId = city.cityId;
        param.token = token;
        this.http.post<Result<ResPM>>(PathUtil.WEATHER_PM_URL, param).subscribe( (res) => {
          res.data.aqi.cityId = city.cityId;
          this.aqis.push(res.data.aqi);
        })
      })
    })
   }
   //获取公告图片
   getBanner(){
    this.storage.get("token").then( (token) => {
      const param = new QueryParam();
      param.table = 'Carousel';
      param.columns = new Array();
      param.columns.push('id');
      param.columns.push('name');
      param.columns.push('outUrl');
      param.columns.push('img');
      param.token = token;
      param.filter = new Filter();
      this.http.post<Result<DataPage<Carousel>>>(PathUtil.QUERY_URL, param).subscribe( (res) => {
        if(res.type === 'success'){
          this.carousels = res.data.list;
        }else{
          this.presentAlert(res.content);
        }
      })
    })
   }
   //跳转公告连接
   toUrl(url: string, title: string){
     debugger
     this.router.navigate(['/carousel'], {
       queryParams: {
         outUrl: url,
         title: title
       }
     })
   }

   //跳转至空气质量
   toAirDetail(cityId: string){
     this.router.navigate(['/air-detail'], {
       queryParams: {
        cityId: cityId
       }
     })
   }

   async presentAlert(msg: string) {
    const alert = await this.alertController.create({
        header: '提示',
        message: msg,
        buttons: ['确认']
    });
    await alert.present();
}

}
