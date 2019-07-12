import { Component, OnInit } from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, NavController} from '@ionic/angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { BindDevice } from 'src/app/bean/Device';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result } from 'src/app/bean/Result';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bind-device',
  templateUrl: './bind-device.page.html',
  styleUrls: ['./bind-device.page.scss'],
})
export class BindDevicePage implements OnInit {

  deviceId: string;
  deviceType: string;
  bindState: string;

  constructor(private http: HttpClient, private network: Network, private alertController: AlertController, private nav: NavController, private barcodeScanner: BarcodeScanner, private storage: Storage, private router: Router) {
    this.deviceType = null;
    this.bindState = '1';
  }

  ngOnInit() {
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.deviceId = barcodeData.text;
    }).catch(err => {
      this.presentAlert(err);
    });
  }
  getType() {
    this.deviceType = this.deviceId.substr(this.deviceId.length - 1, 1);

  }
  showInstruction() {
    this.bindState = '2';
  }
  showConfirm() {
    if ( this.network.type !== 'wifi' && this.deviceType === 'W') {
      this.presentAlert('手机未接入Wi-Fi,请先将手机接入Wi-Fi再继续');
    } else {
      this.presentAlertConfirm('确定Wi-Fi指示灯闪烁，请继续');
    }
  }
  setWifi() {
    this.bindDevice();
    // debugger;
    // const dgram = require('dgram');
    // const message = Buffer.from('Some bytes');
    // const client = dgram.createSocket('udp4');
    // client.send(message, 41234, '255.255.255.255', (err) => {
    //   client.close();
    // });
    this.presentAlert('配网成功');
  }
  bindDevice() {
    let bd: BindDevice = new BindDevice();
    bd.deviceId = this.deviceId;
    this.storage.get('token').then((t) => {
      bd.token = t;
      this.http.post(PathUtil.BIND_DEVICE, bd).subscribe((response) => {
        let res: Result<Object> = <Result<Object>>response;
        if(res.type === 'success'){
          this.presentAlertRouter('绑定成功', '/tabs/mine');
        }else{
          this.presentAlert(res.content);          
        }
      })
    });
  }
  goBack(){
    this.nav.back();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: ['确认']
    });

    await alert.present();
  }
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      // message: msg,
      buttons: [
        {
          text: '返回',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '下一步',
          handler: () => {
            if ( this.deviceType === 'W') {
              this.bindState = '3';
            } else {
              this.bindDevice();
            }
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlertRouter(msg: string, url: string) {
    const alert = await this.alertController.create({
      header: msg,
      // message: msg,
      buttons: [
        {
          text: '返回',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate([url]);
          }
        }
      ]
    });
    await alert.present();
  }

}
