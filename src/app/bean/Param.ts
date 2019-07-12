import { Device } from './Device';

//通用查询
export class QueryParam {
    table: string;
    columns: string[];
    filter: any;
    length: number;
    token: string;
}
export class Filter{
    createTime: CreateTime;
    did: Did;
}
export class CreateTime{
    bt: number[];
}
export class Did{
    eq: string;
}
export class NoticeParam {
    length: number; 
    start: number;
    token: string;
}
//修改表信息
export class UpdTableParam<T> {
    table: string;
    data: T[];
    token: string;
}
//搜索小区
export class searchCommunityParam{
    city: string;
    community: string;
}
//获取天气pm
export class PMParam{
    cityId: number;
    token: string;
}
//获取历史天气pm
export class PMHParam{
    cityId: number;
    startTime: number;
    endTime: number;
    token: string;
}
//获取设备汇总
export class DeviceCountParam{
    token: string;
    type: string;
}
//解绑设备
export class DeviceRelieveParam{
    token: string;
    did: string;
}
//修改设备信息
export class DeviceUpdateParam{
    id: string;
    fields: DeviceFieldParam;
}
export class DeviceFieldParam{
    provinces: string ;//设备地址信息
    city: string ;
    area: string ;
    community: string ;
    location: string;
    houseNum: string; //门牌号
}