import { Component } from '@angular/core';
import {User} from '../../bean/User';
import {AlertController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {PathUtil} from '../../util/PathUtil';
import {Result} from '../../bean/Result';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-findpwd',
  templateUrl: 'findpwd.page.html',
  styleUrls: ['findpwd.page.scss']
})
export class FindpwdPage {

  user: User;
  password: string;
  smsCodeDes: string;
  num: number;
  apply: boolean;
  private timer; // 定时器
  constructor(private alertController: AlertController, private http: HttpClient, private router: Router) {
    this.user = new User();
    this.smsCodeDes = '获取验证码';
  }

  resetPassword() {
    if ( this.user.passwd !== this.password) {
      this.presentAlert('两次输入的密码不一致，请确认！');
      return;
    }
    this.user.passwd = Md5.hashStr(this.user.passwd).toString();
    this.http
        .post(PathUtil.RESET_PWD_URL, this.user)
        .subscribe((data) => {
          const res: Result<User> = JSON.parse(JSON.stringify(data));
          if ( res.type === 'error') {
            this.presentAlert(res.content);
            this.user.passwd = this.password;
          } else {
            this.presentAlert('修改成功');
            this.router.navigate(['/login']);
          }
        });
  }

  sendSmsCode() {
    if ( !this.user.phone) {
      this.presentAlert('请输入手机号');
    }
    this.http
        .post<Result<User>>(PathUtil.SEND_SMS_CODE_URL, this.user)
        .subscribe((res) => {
          this.num = 60;
          if ( res.type === 'success') {
            this.presentAlert('验证码已发送');
            this.timer = setInterval(() => { // 设置定时刷新事件，每隔5秒刷新
              this.num = this.num - 1;
              this.smsCodeDes = this.num + 'S 重新发送';
              if (this.num < 0) {
                this.smsCodeDes = '获取验证码';
                clearInterval(this.timer);
              }
            }, 1000);
          } else {
            this.presentAlert(res.content);
          }
        });
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
