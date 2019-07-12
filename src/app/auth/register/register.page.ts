import { Component } from '@angular/core';
import {User} from '../../bean/User';
import {PathUtil} from '../../util/PathUtil';
import {Result, CommunityLoc} from '../../bean/Result';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Area, AreaOption} from '../../bean/Area';
import {Md5} from 'ts-md5';
import { searchCommunityParam } from 'src/app/bean/Param';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage {

  user: User;
  userName: string;
  password: string;
  areaOptions: AreaOption[];
  province: Area;
  city: Area;
  area: Area;
  citys: Area[];
  areas: Area[];
  smsCodeDes: string;
  num: number;
  apply: boolean;
  private timer; // 定时器
  communityLocs: CommunityLoc[] = new Array(); //搜索的小区
  community: CommunityLoc = new CommunityLoc();
  ifAutoSet: boolean = false;
  ifShowResult: boolean = false;
  constructor(private alertController: AlertController, private http: HttpClient, private router: Router) {
    this.user = new User();
    this.smsCodeDes = '获取验证码';
    this.apply = false;
    this.http.get('../../../assets/area.json')
          .subscribe((data) => {
              this.areaOptions = JSON.parse(JSON.stringify(data));
          });
  }

  register() {
      if ( this.user.passwd !== this.password) {
          this.presentAlert('两次输入的密码不一致，请确认！');
          return;
      }
      this.user.provinces = this.province.text;
      this.user.city = this.city.text;
      this.user.area = this.area.text;
      this.user.passwd = Md5.hashStr(this.user.passwd).toString();
      this.http
        .post<Result<User>>(PathUtil.REGISTER_URL, this.user)
        .subscribe((res) => {
          if ( res.type === 'success') {
            this.presentAlert('注册成功');
            this.router.navigate(['/login']);
          } else {
            this.presentAlert(res.content);
            this.user.passwd = this.password;
          }
        });
  }
  sendSmsCode() {
    if ( !this.user.contactPhone) {
      this.presentAlert('请输入手机号');
    }
    this.user.phone = this.user.contactPhone;
    this.http
        .post<Result<User>>(PathUtil.SEND_SMS_CODE_URL, this.user)
        .subscribe((res) => {
          this.num = 60;
          if ( res.type === 'error') {
            this.presentAlert(res.content);
          } else {
              this.presentAlert('验证码已发送');
              this.timer = setInterval(() => { // 设置定时刷新事件，每隔5秒刷新
                  this.num = this.num - 1;
                  this.smsCodeDes = this.num + 'S 重新发送';
                  if (this.num < 0) {
                      this.smsCodeDes = '获取验证码';
                      clearInterval(this.timer);
                  }
              }, 1000);

          }
        });
  }
  setAutoSet(){
    this.ifAutoSet = false;
  }
  //搜索小区
  searchCommunity(){
    this.ifShowResult = true;
    if(this.ifAutoSet){
      return;
    }
    const param = new searchCommunityParam();
    param.city = this.city.text;
    param.community = this.user.community;
    this.http.post<Result<CommunityLoc[]>>(PathUtil.SEARCH_COMMUNITY, param).subscribe((res) => {
        if(res.type == "success"){
            this.communityLocs = res.data;
        }
    })
  }
  //选择小区
  checkCommunity(){
    this.ifAutoSet = true;
    this.user.community = this.community.name;
    this.user.location = this.community.location;
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
