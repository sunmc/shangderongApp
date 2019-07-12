import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'city-air',
        children: [
          {
            path: '',
            loadChildren: '../tabs/city-air/city-air.module#CityAirPageModule'
          }
        ]
      },
      {
        path: 'device-map',
        children: [
          {
            path: '',
            loadChildren: '../tabs/device-map/device-map.module#DeviceMapPageModule'
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: '../tabs/mine/mine.module#MinePageModule'
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../tabs/more/more.module#MorePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
