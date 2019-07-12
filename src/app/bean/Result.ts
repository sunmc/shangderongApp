import { User } from './User';

export class Result<T>{
    code: string;
    content: string;
    data: T;
    type: string;
}
export class DataPage<T>{
    list: T[];
    total: number;
}
export class ResMember {
    member: User;
    token: string;
}
export class CommunityLoc{
    name: string;
    location: string;
}
export class ResPM{
    aqi: AQI;
    weather: Weather;
}
export class AQI {
    cityId: number;
    cityName: string; //平阴县
    co: number; // 4
    coC: number; // 0.4
    no2: number; // 9
    no2C: number; // 18.0
    o3: number; // 51
    o3C: number; // 161.0
    pm10: number; // 53
    pm10C: number; // 56.0
    pm25: number; // 30
    pm25C: number; // 21.0
    pubtime: string; // 1562245200000
    rank: string; // 423/679
    so2: number; // 2
    so2C: number; // 7.0
    value: number; // 53
}
export class Weather{
    city: City;
    forecast: Forecast[];
}
export class City{
    cityId: number; // 1402
    counname: string; // 中国
    ianatimezone: string; // Asia/Shanghai
    name: string; // 平阴县
    pname: string; // 山东省
    secondaryname: string; // 济南市
    timezone: string; // 8
    id: string; // 1145925054119280640,

    creator: string; // null,
    editor: string; // null,
    user: string; // null,
    createTime: string; // null,
    lastTime: string; // 1562377973462,
    cityName: string; // 北京市,
    province: string; // null,
    flag: string; // null

    isChecked: boolean;
    ifHidden: boolean;
}
export class Forecast{
    conditionDay: string; //多云
    conditionIdDay: string; //1
    conditionIdNight: string; //31
    conditionNight: string; //多云
    humidity: string; //37
    predictDate: string; //2019-07-04
    tempDay: string; //37
    tempNight: string; //26
    updatetime: string; //2019-07-04 22:05:00
    windDegreesDay: string; //180
    windDegreesNight: string; //180
    windDirDay: string; //南风
    windDirNight: string; //南风
    windLevelDay: string; //3-4
    windLevelNight: string; //4-5
}
export class Record{
    name: string; //检测气体名称
    value: string; //检测值
    location: string; //经纬度
    state: string; //正常：报警
}
export class DeviceService{
    id: string;
    title: string; //服务标题
    content: string; //服务说明
    price: number; //服务费用
}
//购买记录
export class BuyRecord{
    time: string;  
    payStatus: string;  
    deviceName: string;  
    servicePackage: string;  
    price: string;
}
//报警记录
export class SosRecord{
    sosStartTime: string;
    sosEndTime: string;
    gasValue: string;
    faultType: string;
    smsSendStatus: string;
}
export class DeviceCount{
    area: string; // 东城区
    city: string; // 市辖区
    community: string; // 花园城
    count: number; //2
    location: string; // 113.922494,22.503179
    provinces: string; // 北京
}
//首页公告
export class Carousel{
    id: string;
    name: string;
    outUrl: string;
    img: string;
}



