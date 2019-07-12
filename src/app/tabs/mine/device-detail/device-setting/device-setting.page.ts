import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Device } from 'src/app/bean/Device';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result, DataPage } from 'src/app/bean/Result';
import { DeviceRelieveParam } from 'src/app/bean/Param';

@Component({
  selector: 'app-device-setting',
  templateUrl: './device-setting.page.html',
  styleUrls: ['./device-setting.page.scss'],
})
export class DeviceSettingPage {
  device: Device;
  token: string;
  constructor(private toast: ToastController, private router: Router, private storage: Storage, private http: HttpClient, private alertController: AlertController, private nav: NavController, private activatedRouter: ActivatedRoute) { 
    this.activatedRouter.queryParams.subscribe( (params: Params) => {
      this.device = JSON.parse(params['device']);
    })
    this.storage.get('token').then( token => {
      this.token = token;
    })
  }
  ionViewDidEnter(){
    this.queryDeviceInfo();
  }
  goBack(){
    this.nav.back();
  }

  toAddressSetting(){
    this.router.navigate(['/address-setting'], {
      queryParams: {
        device: JSON.stringify(this.device)
      }
    })
  }

  async updateName() {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'deviceName',
          type: 'text',
          value: this.device.deviceName,
          placeholder: '请编辑设备名称'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (data) => {
            
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteDevice() {
    const alert = await this.alertController.create({
      message: '请确认是否删除设备？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (data) => {
            const param = new DeviceRelieveParam();
            param.token = this.token;
            param.did = this.device.deviceId;
            this.http.post<Result<any>>(PathUtil.DEVICE_RELIEVE, param).subscribe(res=>{
              if(res.type === 'success'){
                this.presentAlert('删除成功!');
                this.router.navigate(['/tabs/mine']);
              }else{
                this.presentAlert(res.content);
              }
            })
          }
        }
      ]
    });
    await alert.present();
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
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
        header: '提示',
        message: msg,
        buttons: ['确认']
    });
    await alert.present();
  }
}
