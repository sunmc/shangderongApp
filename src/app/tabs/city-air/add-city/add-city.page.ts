import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathUtil } from 'src/app/util/PathUtil';
import { Result, City } from 'src/app/bean/Result';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.page.html',
  styleUrls: ['./add-city.page.scss'],
})
export class AddCityPage implements OnInit {
  searchKey: string;
  cityList: City[];
  cityListFilter: City[];
  checkdCityList: City[];
  constructor(private storage: Storage, private http: HttpClient, private nav: NavController) { 
    this.cityList = new Array();
    this.cityListFilter = new Array();
    this.checkdCityList = new Array();
    
  }
  goBack(){
    this.nav.back();
  }
  //勾选城市后，保存至本地
  saveChecked(){
    this.storage.set("AllCitys", this.cityList);
    this.filterChecked();
  }
  //移除城市
  removeChecked(cityId: number){
    this.cityList.forEach((city) => {
      if(city.isChecked && city.cityId == cityId){
        city.isChecked = false;
      }
    })
    this.saveChecked();
  }
  //显示已勾选的城市
  filterChecked(){
    this.checkdCityList = new Array();
    this.cityList.forEach((city) => {
      if(city.isChecked){
        this.checkdCityList.push(city);
      }
    })
    this.storage.set("checkdCityList", this.checkdCityList);
  }
  //搜索城市
  searchCity(event){
    const query = event.target.value.toLowerCase();
    const items: any[] = Array.from(document.querySelector('ion-list').children);
    items.forEach(item => {
      const shouldShow = item.textContent.indexOf(query) > -1;
      item.style.display = shouldShow ? 'block' : 'none';
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log('111');
    //获取本地保存的所有城市信息，如果没有则从接口获取
    this.storage.get("AllCitys").then( (cs) => {
      if(cs != null){
        this.cityList = cs;
        this.cityListFilter = cs;
        this.filterChecked();
      }else{
        this.http.get<Result<City[]>>(PathUtil.WEATHER_CITY).subscribe( (res) => {
          this.cityList = res.data;
          this.cityListFilter = res.data;
          this.storage.set("AllCitys", res.data);
          this.filterChecked();
        })
      }
      console.log(cs.length);
    })
  }

}
