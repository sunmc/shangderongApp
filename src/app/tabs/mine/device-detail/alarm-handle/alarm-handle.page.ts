import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-alarm-handle',
  templateUrl: './alarm-handle.page.html',
  styleUrls: ['./alarm-handle.page.scss'],
})
export class AlarmHandlePage implements OnInit {

  solveMethod: string;
  constructor(private nav: NavController, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((params: Params)=>{
      this.solveMethod = params['solveMethod'];
    })
  }

  ngOnInit() {
  }

  goBack(){
    this.nav.back();
  }
}
