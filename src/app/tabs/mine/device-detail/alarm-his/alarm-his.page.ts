import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { PathUtil } from 'src/app/util/PathUtil';
import { User } from 'src/app/bean/User';
import { Result, DataPage, SosRecord } from 'src/app/bean/Result';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alarm-his',
  templateUrl: './alarm-his.page.html',
  styleUrls: ['./alarm-his.page.scss'],
})
export class AlarmHisPage implements OnInit {

  sosRecords: SosRecord[] = new Array();
  constructor(private nav: NavController, private http: HttpClient, private storage: Storage, private datePipe: DatePipe) { 
    this.storage.get('userInfo').then((userInfo: User) => {
      this.storage.get('token').then(token=>{
        let param = '{"table":"Sos","columns":["sosStartTime","sosEndTime","gasValue","faultType","smsSendStatus"],"filter":{"member":{"eq":"'+userInfo.id+'"}},"start":0,"length":10,"token":"'+token+'"}';
        this.http.post<Result<DataPage<SosRecord>>>(PathUtil.QUERY_URL, JSON.parse(param)).subscribe(res=>{
          if(res.type === 'sucess'){
            this.sosRecords = res.data.list;
            this.sosRecords.forEach(element => {
              element.sosStartTime = this.datePipe.transform(new Date(element.sosStartTime), 'yyyy-MM-dd HH:mm:ss');
              element.sosEndTime = this.datePipe.transform(new Date(element.sosEndTime), 'yyyy-MM-dd HH:mm:ss');
            })
          }
        });
      })
    })
  }

  ngOnInit() {
  }

  goBack(){
    this.nav.back();
  }

}
