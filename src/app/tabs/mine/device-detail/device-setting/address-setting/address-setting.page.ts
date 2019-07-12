import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AreaOption, Area } from 'src/app/bean/Area';
import { Device } from 'src/app/bean/Device'
import { PathUtil } from 'src/app/util/PathUtil';
import { Result, CommunityLoc } from 'src/app/bean/Result';
import { searchCommunityParam, UpdTableParam, DeviceUpdateParam, DeviceFieldParam } from 'src/app/bean/Param';
import { ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-address-setting',
  templateUrl: './address-setting.page.html',
  styleUrls: ['./address-setting.page.scss'],
})
export class AddressSettingPage implements OnInit {

  
    areaOptions: AreaOption[];
    citys: Area[];
    areas: Area[];
    province: Area;
    city: Area;
    area: Area;
    device: Device = new Device();
    communityLocs: CommunityLoc[] = new Array(); //搜索的小区
    community: CommunityLoc = new CommunityLoc();
    ifAutoSet: boolean = false;
    ifShowResult: boolean = false;
    token: string;
    constructor(private nav: NavController, private storage: Storage, private activatedRoute: ActivatedRoute, private alertController: AlertController, private http: HttpClient) {
        this.http.get<AreaOption[]>('../../../../../assets/area.json')
          .subscribe((data) => {
              this.areaOptions = data;
              this.activatedRoute.queryParams.subscribe((params: Params)=>{
                this.device = JSON.parse(params['device']);
                this.initSelect();
              })
          }); 
          this.storage.get('token').then(token=>{
            this.token = token;
          })
    }
    goBack(){
      this.nav.back();
    }
    initSelect(){
      this.areaOptions[0].options.forEach(element => {
        if(this.device.provinces){
          if(element.text === this.device.provinces){
            this.province = element
            this.areaFilter(1);
            this.areaOptions[1].options.forEach(element => {
              if(this.device.city){
                if(element.text === this.device.city){
                  this.city = element
                  this.areaFilter(2);
                  this.areaOptions[2].options.forEach(element => {
                    if(this.device.area){
                      if(element.text === this.device.area){
                        this.area = element
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
    updateAddress() {
        this.device.provinces = this.province.text;
        this.device.city = this.city.text;
        this.device.area = this.area.text;
        const param = new UpdTableParam<DeviceUpdateParam>();
        param.table = "DeviceModel";
        param.data = new Array();
        const dd = new DeviceUpdateParam();
        dd.id = this.device.id;
        dd.fields = new DeviceFieldParam();
        dd.fields.provinces = this.device.provinces;
        dd.fields.city = this.device.city;
        dd.fields.area = this.device.area;
        dd.fields.location = this.device.location;
        dd.fields.community = this.device.community;
        dd.fields.houseNum = this.device.houseNum;
        param.data.push(dd);
        param.token = this.token;
        this.http.post<Result<Device>>(PathUtil.APP_UPDATE, param)
        .subscribe((res) => {
          debugger
            if(res.type === 'success'){
                this.presentAlert('修改成功');
            }else{
                this.presentAlert(res.content);
            }
        })
    }
    //搜索小区
  searchCommunity(){
    this.ifShowResult = true;
    if(this.ifAutoSet){
      return;
    }
    const param = new searchCommunityParam();
    param.city = this.city.text;
    param.community = this.device.community;
    this.http.post<Result<CommunityLoc[]>>(PathUtil.SEARCH_COMMUNITY, param).subscribe((res) => {
        if(res.type == "success"){
            this.communityLocs = res.data;
        }
    })
  }
  //选择小区
  checkCommunity(){
    this.ifAutoSet = true;
    this.device.community = this.community.name;
    this.device.location = this.community.location;
  }
  //收起搜索结果
  closeResult(){
    this.ifShowResult = false;
  }
 
    async presentAlert(msg: string) {
        const alert = await this.alertController.create({
          header: '提示',
          message: msg,
          buttons: ['确认']
        });
    
        await alert.present();
      }
    ngOnInit() {}
    areaFilter(index: number) {
        let v: string;
        if (index === 1) {
            this.citys = [];
            v = this.province.value;
        } else if (index === 2) {
            this.areas = [];
            v = this.city.value;
        }
        this.areaOptions[index].options.forEach((val) => {
            if (val.parentVal === v) {
                if (index === 1) {
                    this.citys.push(val);
                } else if (index === 2) {
                    this.areas.push(val);
                }
            }
        });
    }
}
