import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Token, Device, CheckRecord } from 'src/app/bean/Device';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result } from 'src/app/bean/Result';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mine',
  templateUrl: 'mine.page.html',
  styleUrls: ['mine.page.scss']
})
export class MinePage {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  user: any;
  deviceList: Device[] = new Array();
  constructor( private router: Router, private http: HttpClient, private storage: Storage, private alertController: AlertController,private datePipe:DatePipe) {
    
  }

  ionViewDidEnter(){
    this.storage.get('token').then((t) => {
      if(t){
        this.getDeviceList(t);
      }else{
        this.getDeviceList(PathUtil.TOKEN);
      }
    });
  }

  showAddDevice() {
    this.router.navigate(['/add-device']);
  }

  getDeviceList(t: string) {
    let token: Token = new Token();
    // token.token = PathUtil.TOKEN;
    token.token = t;
    //获取我的设备列表
    this.http.post<Result<Device[]>>(PathUtil.DEVICE_LIST, token).subscribe((res) => {
      if ( res.type === 'success') {
        this.deviceList = res.data;
        this.deviceList.forEach(x => {
          x.currentTime = this.datePipe.transform(new Date(x.currentTime), 'yyyy-MM-dd HH:mm:ss');
          //发布需删除部分
          if(x.checkRecord == null || x.checkRecord.length == 0){
            const cr = new CheckRecord();
            cr.gasName = '天然气';
            cr.checkValue = 1.5;
            cr.state = '正常';
            x.checkRecord = new Array();
            x.checkRecord.push(cr);
          }
        })
      } else {
        this.presentAlert(res.content);
      }
    })
  }
  //跳转到设备详情页面
  showDetail(d: Device){
    this.router.navigate(['/device-detail'], {
      queryParams: {
        device: JSON.stringify(d)
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
