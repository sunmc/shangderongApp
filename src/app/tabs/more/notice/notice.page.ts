import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/bean/Device';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result } from 'src/app/bean/Result';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { NoticeParam } from 'src/app/bean/Param';
import { Router } from '@angular/router';
import { CommonUtil } from 'src/app/util/CommonUtil';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  noticeList: Notice[];
  constructor(private http: HttpClient, private storage: Storage, private alertController: AlertController, private router: Router, private nav: NavController) { 
  
  }
  goBack(){
    this.nav.back();
  }

  toDetail(notice: Notice){
    this.router.navigate(['/notice-detail'], {
      queryParams: {
        noticeId: notice.id
      }
    })
  }

  ngOnInit() {
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: ['确认']
    });

    await alert.present();
  }
  ionViewDidEnter(){
    this.storage.get('noticeList').then(noticeList => {
      this.noticeList = noticeList;
    })
  }
}
