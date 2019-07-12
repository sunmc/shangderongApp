import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Result, DeviceService } from 'src/app/bean/Result';
import { PathUtil } from 'src/app/util/PathUtil';

@Component({
  selector: 'app-get-service',
  templateUrl: './get-service.page.html',
  styleUrls: ['./get-service.page.scss'],
})
export class GetServicePage implements OnInit {

  deivceId: string;
  deviceService: DeviceService[] = new Array();
  constructor(private router: Router, private nav: NavController, private activatedRoute: ActivatedRoute, private storage: Storage, private http: HttpClient) { 
    this.activatedRoute.queryParams.subscribe((params: Params)=>{
      this.deivceId = params['deviceId'];
      this.storage.get('token').then(token=>{
        let param = '{"deviceId":"'+this.deivceId+'","token":"'+token+'"}';
        this.http.post<Result<DeviceService[]>>(PathUtil.DEVICE_SERVICE, JSON.parse(param)).subscribe(res=>{
          if(res.type === 'success'){
            this.deviceService = res.data;
          }else{
            console.log(res.content);
          }
        })
      })
    })
  }

  ngOnInit() {
  }
  goBack(){
    this.nav.back();
  }
  toGetServiceHis(){
    this.router.navigate(['/get-service-his']);
  }

}
