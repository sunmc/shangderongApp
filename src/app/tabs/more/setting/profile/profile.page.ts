import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/bean/User';
import { AlertController, NavController } from '@ionic/angular';
import { UpdTableParam } from 'src/app/bean/Param';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  user: User;
  constructor(private alertController: AlertController, private http: HttpClient, private storage: Storage, private nav: NavController) {
    // this.user = new User();
    // this.user.nickname = '李小白';
    // this.user.email = 'lixiaobai@email.com';
    // this.user.sosName1 = '王小红';
    // this.user.sosPhone1 = '12345678901';
    // this.user.sosName2 = '王小红';
    // this.user.sosPhone2 = '12345678901';
    this.storage.get("userInfo").then((userInfo) => {
      this.user = userInfo;
    })
   }
   goBack(){
     this.nav.back();
   }

   async updateNickname() {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'nickname',
          type: 'text',
          value: this.user.nickname,
          placeholder: '请编辑昵称'
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
            this.user.nickname = data.nickname;
            const updUserParam = new UpdTableParam<User>();
            updUserParam.data = new Array();
            updUserParam.data.push(this.user);
            updUserParam.table = 'Member';
            this.storage.get('token').then((token) => {
              updUserParam.token = token;
              this.http.post(PathUtil.APP_UPDATE, updUserParam).subscribe( (res) => {
                debugger;
              })

            })
          }
        }
      ]
    });

    await alert.present();
  }
  async updateEmail() {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'email',
          type: 'text',
          value: this.user.email,
          placeholder: '请编辑邮箱'
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
            this.user.email = data.email;
          }
        }
      ]
    });

    await alert.present();
  }
  async updateSos1() {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'sosName1',
          type: 'text',
          value: this.user.sosName1,
          placeholder: '请编辑紧急联系人姓名'
        },
        {
          name: 'sosPhone1',
          type: 'text',
          value: this.user.sosPhone1,
          placeholder: '请编辑紧急联系人电话'
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
            this.user.sosName1 = data.sosName1;
            this.user.sosPhone1 = data.sosPhone1;
          }
        }
      ]
    });

    await alert.present();
  }
  async updateSos2() {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'sosName2',
          type: 'text',
          value: this.user.sosName2,
          placeholder: '请编辑紧急联系人姓名'
        },
        {
          name: 'sosPhone2',
          type: 'text',
          value: this.user.sosPhone2,
          placeholder: '请编辑紧急联系人电话'
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
            this.user.sosName2 = data.sosName2;
            this.user.sosPhone2 = data.sosPhone2;
          }
        }
      ]
    });

    await alert.present();
  }

}
