import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.nav.back();
  }
}
