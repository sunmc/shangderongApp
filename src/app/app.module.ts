import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {Network} from '@ionic-native/network/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'ios',
    backButtonIcon: '返回'
  }), IonicStorageModule.forRoot({name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']}), AppRoutingModule, HttpClientModule],
  providers: [
      StatusBar,
      SplashScreen,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      Network,
      SQLite,
      BarcodeScanner,
      HeaderColor,
      DatePipe,
      CallNumber,
      NavController,
      InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
