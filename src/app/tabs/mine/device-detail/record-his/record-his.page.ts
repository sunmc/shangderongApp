import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-record-his',
  templateUrl: './record-his.page.html',
  styleUrls: ['./record-his.page.scss'],
})
export class RecordHisPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }
  goBack(){
    this.nav.back();
  }
}
