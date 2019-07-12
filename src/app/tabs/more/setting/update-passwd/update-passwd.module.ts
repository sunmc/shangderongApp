import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePasswdPage } from './update-passwd.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePasswdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatePasswdPage]
})
export class UpdatePasswdPageModule {}
