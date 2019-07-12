import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GetServiceHisPage } from './get-service-his.page';

const routes: Routes = [
  {
    path: '',
    component: GetServiceHisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GetServiceHisPage]
})
export class GetServiceHisPageModule {}
