import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/bean/Device';
import { ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {

  notice: Notice = new Notice();
  imgs: string[] = new Array();
  constructor(private activatedRouter: ActivatedRoute, private storage: Storage, private nav: NavController) { 
    this.activatedRouter.queryParams.subscribe( (param: Params) => {
        const noticeId = param['noticeId'];
        this.storage.get('noticeList').then((noticeList) => {
          noticeList.forEach((n) => {
            if(n.id === noticeId){
              n.isRead = true;
              this.notice = n;
              if(this.notice.imgUrl){
                this.imgs = JSON.parse(this.notice.imgUrl);
              }
            }
          });
          this.storage.set('noticeList', noticeList);
        })
    })
  }
  goBack(){
    this.nav.back();
  }
  ngOnInit() {
  }

}
