import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AfterServiceApplyPage } from './after-service-apply.page';

const routes: Routes = [
  {
    path: '',
    component: AfterServiceApplyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AfterServiceApplyPage]
})
export class AfterServiceApplyPageModule {}
