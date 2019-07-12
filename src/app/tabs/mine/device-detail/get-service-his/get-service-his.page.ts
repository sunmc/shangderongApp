import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/bean/User';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result, DataPage, BuyRecord } from 'src/app/bean/Result';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-get-service-his',
  templateUrl: './get-service-his.page.html',
  styleUrls: ['./get-service-his.page.scss'],
})
export class GetServiceHisPage implements OnInit {

  buyRecords: BuyRecord[] = new Array();
  constructor(private nav: NavController, private http: HttpClient, private storage: Storage, private datePipe: DatePipe) { 
    this.storage.get('userInfo').then((userInfo: User) => {
      this.storage.get('token').then(token=>{
        let param = '{"table": "BuyRecord","columns": ["time", "payStatus", "deviceName", "servicePackage", "price"],"filter": {"member" : {"eq": "'+userInfo.id+'"}},"token": "'+token+'"} ';
        this.http.post<Result<DataPage<BuyRecord>>>(PathUtil.QUERY_URL, JSON.parse(param)).subscribe(res=>{
          if(res.type === 'sucess'){
            this.buyRecords = res.data.list;
            this.buyRecords.forEach(element => {
              element.time = this.datePipe.transform(new Date(element.time), 'yyyy-MM-dd HH:mm:ss');
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
