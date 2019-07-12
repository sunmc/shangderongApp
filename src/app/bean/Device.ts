export class Device {
    id: string; //key
    deviceId: string; //设备ID
    deviceName: string; //设备名称，例：燃气报警R2
    imgUrl: string; //设备图片url
    serviceTime: string; //服务时间 2019.06.06-2020.06.06
    currentTime: string; //当前时间
    state: string; //报警器状态：在线，离线
    version: string; //硬件版本号
    provinces: string ;//设备地址信息
    city: string ;
    area: string ;
    community: string ;
    location: string;
    houseNum: string; //门牌号
    checkRecord: CheckRecord[]; //最新检测记录
    solveMethod: string; //事故解除办法
}
export class CheckRecord{
    gasName: string; //检测气体名称，例：天然气
    checkValue: number; //检测值
    suggest: string; //建议
    checkTime: Date; //检测时间
    state: string; //报警状态：正常，报警
}
export class BindDevice {
    deviceId: string;
    token: string;
}
export class Token {
    token: string;
}
export class AfterService {
    //设备信息
    deviceName: string; //设备名称
    deviceId: string; //设备id
    address: string; //设备地址
    // serviceTime: Date ; //服务时间
    memo: string; //备注
    //维护信息
    worker: string; //工作人员
    phone: string; //电话
    serviceTime: Date ; //服务时间
    whState: string; //维护状态
    deviceState: string; //设备状态
}
export class Notice {
    id: string; //id
    title: string; //公告标题
    imgUrl: string; //公告内容
    time: Date; //公告发布日期
    times: string;
    isRead: boolean; //已读标志
}
