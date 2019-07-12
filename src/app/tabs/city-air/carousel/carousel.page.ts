import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.page.html',
  styleUrls: ['./carousel.page.scss'],
})
export class CarouselPage implements OnInit {

  title: string;
  outUrl: string;
  constructor(private activatedRoute: ActivatedRoute, private nav: NavController) { 
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      this.title = params['title'];
      this.outUrl = params['outUrl'];
    })
  }

  goBack(){
    this.nav.back();
  }
  ngOnInit() {
  }

}
