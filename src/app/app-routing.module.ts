import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginPageModule'
  },
  {
    path: 'findpwd',
    loadChildren: './auth/findpwd/findpwd.module#FindpwdPageModule'
  },
  {
    path: 'register',
    loadChildren: './auth/register/register.module#RegisterPageModule'
  },
  {
    path: 'protocol',
    loadChildren: './auth/protocol/protocol.module#ProtocolPageModule'
  },
  {
    path: 'add-device',
    loadChildren: './tabs/mine/add-device/add-device.module#AddDevicePageModule'
  },
  { 
    path: 'bind-device', 
    loadChildren: './tabs/mine/add-device/bind-device/bind-device.module#BindDevicePageModule' 
  },
  {
    path: 'device-detail',
    loadChildren: './tabs/mine/device-detail/device-detail.module#DeviceDetailPageModule'
  },
  { 
    path: 'device-setting', 
    loadChildren: './tabs/mine/device-detail/device-setting/device-setting.module#DeviceSettingPageModule' 
  },
  { 
    path: 'address-setting', 
    loadChildren: './tabs/mine/device-detail/device-setting/address-setting/address-setting.module#AddressSettingPageModule' 
  },
  { path: 'alarm-handle', loadChildren: './tabs/mine/device-detail/alarm-handle/alarm-handle.module#AlarmHandlePageModule' },
  { path: 'get-service', loadChildren: './tabs/mine/device-detail/get-service/get-service.module#GetServicePageModule' },
  { path: 'get-service-his', loadChildren: './tabs/mine/device-detail/get-service-his/get-service-his.module#GetServiceHisPageModule' },
  { path: 'alarm-his', loadChildren: './tabs/mine/device-detail/alarm-his/alarm-his.module#AlarmHisPageModule' },
  { path: 'record-his', loadChildren: './tabs/mine/device-detail/record-his/record-his.module#RecordHisPageModule' },
  { path: 'record-his-detail', loadChildren: './tabs/mine/device-detail/record-his-detail/record-his-detail.module#RecordHisDetailPageModule' },
  { path: 'record-his-pro', loadChildren: './tabs/mine/device-detail/record-his-pro/record-his-pro.module#RecordHisProPageModule' },
  { path: 'after-service', loadChildren: './tabs/more/after-service/after-service.module#AfterServicePageModule' },
  { path: 'after-service-detail', loadChildren: './tabs/more/after-service/after-service-detail/after-service-detail.module#AfterServiceDetailPageModule' },
  { path: 'notice', loadChildren: './tabs/more/notice/notice.module#NoticePageModule' },
  { path: 'notice-detail', loadChildren: './tabs/more/notice/notice-detail/notice-detail.module#NoticeDetailPageModule' },
  { path: 'after-service-apply', loadChildren: './tabs/more/after-service/after-service-apply/after-service-apply.module#AfterServiceApplyPageModule' },
  { path: 'setting', loadChildren: './tabs/more/setting/setting.module#SettingPageModule' },
  { path: 'profile', loadChildren: './tabs/more/setting/profile/profile.module#ProfilePageModule' },
  { path: 'update-passwd', loadChildren: './tabs/more/setting/update-passwd/update-passwd.module#UpdatePasswdPageModule' },
  { path: 'about', loadChildren: './tabs/more/about/about.module#AboutPageModule' },
  { path: 'add-city', loadChildren: './tabs/city-air/add-city/add-city.module#AddCityPageModule' },
  { path: 'air-detail', loadChildren: './tabs/city-air/air-detail/air-detail.module#AirDetailPageModule' },
  { path: 'air-chart', loadChildren: './tabs/city-air/air-detail/air-chart/air-chart.module#AirChartPageModule' },
  { path: 'carousel', loadChildren: './tabs/city-air/carousel/carousel.module#CarouselPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
