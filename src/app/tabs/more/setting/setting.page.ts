import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private router: Router, private storage: Storage, private nav: NavController) { }

  ngOnInit() {
  }
  goBack(){
    this.nav.back();
  }

  logout() {
    this.storage.get('loginInfo').then((val) => {
      if (val && val.phone && val.passwd) {
        val.autoLogin = false;
        this.storage.set('loginInfo', val);
      }
      this.router.navigate(['/login']);
  });
  }
}
