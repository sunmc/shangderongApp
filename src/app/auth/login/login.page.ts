import { Component } from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';
import {PopoverPage} from './PopoverPage';
import {User} from '../../bean/User';
import {HttpClient} from '@angular/common/http';
import {Result, ResMember} from '../../bean/Result';
import {Router} from '@angular/router';
import {PathUtil} from '../../util/PathUtil';
import {Md5} from 'ts-md5';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

    user: User;
    ifShowPwd: boolean;
    constructor(public popoverController: PopoverController, private alertController: AlertController, private http: HttpClient, private router: Router, private storage: Storage) {
        this.ifShowPwd = false;
        this.user = new User();
        this.storage.get('loginInfo').then((val) => {
            if (val && val.phone && val.passwd) {
                this.user.phone = val.phone;
                this.user.passwd = val.passwd;
                if (val.autoLogin) {
                    this.login();
                }
            }
        });
    }
    login() {
      if (this.user.passwd.length < 32) {
          this.user.passwd = Md5.hashStr(this.user.passwd).toString();
      }
      this.http
        .post<Result<ResMember>>(PathUtil.LOGIN_URL, this.user)
        .subscribe((response) => {
          // const res: Result<User> = JSON.parse(JSON.stringify(data));
          let res: Result<ResMember> = response;
          if ( res.type === 'success') {
              // 保存成功的登录记录
              this.user.autoLogin = true;
              this.storage.set('loginInfo', this.user);
              this.storage.set('token', res.data.token);
              this.storage.set('userInfo', res.data.member);
              PathUtil.TOKEN = res.data.token;
              this.storage.get('loginList').then((val) => {
                if (!val) {
                    var lls: User[] = new Array(this.user);
                    this.storage.set('loginList', lls);
                } else {
                    var isSaved: boolean = false;
                    val.forEach( (value) => {
                        if (value.phone === this.user.phone) {
                            value.passwd = this.user.passwd;
                            isSaved = true;
                        }
                    })
                    if (!isSaved) {
                        val.push(this.user);
                        this.storage.set('loginList', val);
                    }
                }
                this.router.navigate(['/tabs/mine']);
              })
          } else {
            this.user.passwd = '';
            this.presentAlert(res.content);
          }
        });
    }
    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
          component: PopoverPage,
          event: ev
        });
        return await popover.present();
    }

    async presentAlert(msg: string) {
        const alert = await this.alertController.create({
            header: '提示',
            message: msg,
            buttons: ['确认']
        });
        await alert.present();
    }

    isSaveUser(element, index, array) {
        return (element.phone === this.user.phone);
    }
}
