import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecordHisDetailPage } from './record-his-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RecordHisDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecordHisDetailPage]
})
export class RecordHisDetailPageModule {}
