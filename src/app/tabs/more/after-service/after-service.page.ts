import { Component, OnInit } from '@angular/core';
import { AfterService } from 'src/app/bean/Device';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-after-service',
  templateUrl: './after-service.page.html',
  styleUrls: ['./after-service.page.scss'],
})
export class AfterServicePage implements OnInit {

  afDataList: AfterService[];
  constructor(private nav: NavController, private router: Router) { 
    this.afDataList = new Array();
    const afData = new AfterService();
    afData.deviceName = '燃气报警器1';
    afData.deviceId = 'RQ01A1906210001';
    afData.address = '山东省青岛市市北区舞阳路7号青岛科技城';
    afData.serviceTime = new Date();
    afData.memo = '多行显示效果多行显示效果多行显示效果多行显示效果多行显示效果多行显示效果';
    afData.worker = '李小白';
    afData.phone = '12345678901';
    afData.whState = '维护完成';
    afData.deviceState = '正常';
    this.afDataList.push(afData);
   }

   goBack(){
     this.nav.back();
   }
   toAterServiceApplly(){
     this.router.navigate(['/after-service-apply']);
   }
  ngOnInit() {
  }


}
