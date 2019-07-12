import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AfterServiceDetailPage } from './after-service-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AfterServiceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AfterServiceDetailPage]
})
export class AfterServiceDetailPageModule {}
