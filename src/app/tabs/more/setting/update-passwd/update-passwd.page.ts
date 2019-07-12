import { Component, OnInit } from '@angular/core';
import { updPwd, User } from 'src/app/bean/User';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result } from 'src/app/bean/Result';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-passwd',
  templateUrl: './update-passwd.page.html',
  styleUrls: ['./update-passwd.page.scss'],
})
export class UpdatePasswdPage {

  pwd: updPwd;
  oldPwd: string;
  newPwd: string;
  passwd: string;
  constructor(private http: HttpClient, private alertController: AlertController, private storage: Storage, private router: Router, private nav: NavController) { 
    this.pwd = new updPwd();
  }
  goBack(){
    this.nav.back();
  }

  updatePasswd(){
    if(!this.oldPwd){
      this.presentAlert('请输入旧密码');
      return;
    }
    if(!this.newPwd){
      this.presentAlert('请输入新密码');
      return;
    }
    if(!this.passwd){
      this.presentAlert('请再次输入新密码');
      return;
    }
    if(this.newPwd !== this.passwd){
      this.presentAlert('两次输入的新密码不一致，请确认');
      return;
    }
    this.storage.get('token').then((token) => {
      this.pwd.newPwd = Md5.hashStr(this.newPwd).toString();
      this.pwd.oldPwd = Md5.hashStr(this.oldPwd).toString();
      this.pwd.token = token;
      this.http.post<Result<User>>(PathUtil.UPDATE_PWD_URL, this.pwd).subscribe((res) => {
        if(res.type === "success"){
          this.presentAlert("修改成功");
          this.router.navigate(['/setting'])
        }
        debugger;
      });
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
