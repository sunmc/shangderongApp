import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/bean/User';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/bean/Result';
import { PathUtil } from 'src/app/util/PathUtil';
import { Device, Token, Notice } from 'src/app/bean/Device';
import { NoticeParam } from 'src/app/bean/Param';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  user: User = new User();
  deviceCount: number = 0;
  noticeCount: number = 0;
  isRead: boolean = false;
  constructor(private storage: Storage, private http: HttpClient, private call: CallNumber, private toast: ToastController, private router: Router) { 
    this.storage.get("userInfo").then( (user) => {
      this.user = user;
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    //获取设备数量
    // token.token = PathUtil.TOKEN;
    this.storage.get('token').then((t) => {
      const token= new Token()
      token.token = t;
      //获取我的设备列表
      this.http.post<Result<Device[]>>(PathUtil.DEVICE_LIST, token).subscribe((res) => {
        if ( res.type === 'success') {
          this.deviceCount = res.data.length;
        } else {
          
        }
      })
      //获取通知数量
      const np = new NoticeParam();
      np.start = 0;
      np.length = 1000;
      np.token = t;
      this.http.post<Result<Notice[]>>(PathUtil.GET_NOTICE_URL, np).subscribe((res) => {
        if(res.type === 'success'){
          this.storage.get('noticeList').then((noticeList) => {
            this.noticeCount = 0;
            if(noticeList == null){
              this.noticeCount = res.data.length;
              this.storage.set('noticeList', res.data);
            }else{
              res.data.forEach((newnotice) => {
                this.isRead = false;
                noticeList.forEach((localnotice) => {
                  if(newnotice.id === localnotice.id && localnotice.isRead){
                    this.isRead = true;
                    newnotice.isRead = true;
                  }
                })
                if(!this.isRead){
                  this.noticeCount++;
                }
              })
              this.storage.set('noticeList', res.data);
            }
          })
        }else{
          // this.presentAlert(res.content);
        }
      })
    });
  }
  callNumber(phoneNum){
    this.call.callNumber(phoneNum, true).then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  toNotice(){
    this.router.navigate(['/notice'])
  }
  toSetting(){
    this.router.navigate(['/setting'])
  }
  async cleanCache(){
    const toast = await this.toast.create({
      message: '清理成功！',
      color: 'dark',
      duration: 1000
    });
    toast.present();
  }
}
