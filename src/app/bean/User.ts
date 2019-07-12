export class User {
    area: string ;
    avatar: string ;
    city: string ;
    code: string ;
    community: string ;
    contactName: string ;
    contactPhone: string ;
    createTime: number ;
    creator: number ;
    deviceCount: number ;
    deviceModel: string ;
    editor: number ;
    email: string ;
    houseNum: string ;
    id: number ;
    lastTime: number ;
    location: string ;
    nickname: string ;
    note: string ;
    passwd: string ;
    provinces: string ;
    sosName1: string ;
    sosName2: string ;
    sosPhone1: string ;
    sosPhone2: string ;
    type: string ; // = ['common', 'enterprise'],
    user: number ;
    userName: string;
    password: string;
    phone: string;
    autoLogin: boolean;
}
export class Device {
    id: string;
}
//密码更新 /app/v0/member/changePwd
export class updPwd{
    newPwd: string;
    oldPwd: string;
    token: string;
}
