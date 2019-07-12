import { Component, OnInit } from '@angular/core';
import { AfterService } from 'src/app/bean/Device';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-after-service-apply',
  templateUrl: './after-service-apply.page.html',
  styleUrls: ['./after-service-apply.page.scss'],
})
export class AfterServiceApplyPage implements OnInit {

  afData: AfterService;
  constructor(private nav: NavController) { 
    this.afData = new AfterService();
    this.afData.deviceName = '燃气报警器1';
    this.afData.deviceId = 'RQ01A1906210001';
    this.afData.address = '山东省青岛市市北区舞阳路7号青岛科技城';
    this.afData.serviceTime = new Date();
    this.afData.memo = '多行显示效果多行显示效果多行显示效果多行显示效果多行显示效果多行显示效果';
    this.afData.worker = '李小白';
    this.afData.phone = '12345678901';
    this.afData.whState = '维护完成';
    this.afData.deviceState = '正常';
  }

  ngOnInit() {
  }

  goBack(){
    this.nav.back();
  }
}
