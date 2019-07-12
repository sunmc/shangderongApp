import { User } from '../bean/User';

export class PathUtil {
    static TOKEN = '';
    static USER_INFO: User = new User();
    static SERVER_HOST = 'http://192.144.142.202:8085';
    //登录相关
    static LOGIN_URL = PathUtil.SERVER_HOST + '/app/v0/member/login';
    static REGISTER_URL = PathUtil.SERVER_HOST + '/app/v0/member/register';
    static SEND_SMS_CODE_URL = PathUtil.SERVER_HOST + '/app/v0/member/sendSmsCode';
    static RESET_PWD_URL = PathUtil.SERVER_HOST + '/app/v0/member/resetPwd';
    //城市空气
    static QUERY_URL = PathUtil.SERVER_HOST + '/app/query';
    //天气相关
    //空气质量指数
    static WEATHER_PM_URL = PathUtil.SERVER_HOST + '/app/v0/member/weather';
    //获取城市
    static WEATHER_CITY = PathUtil.SERVER_HOST + '/app/v0/member/cityList';
    //PM历史数据
    static WEATHER_PM_HISTORY = PathUtil.SERVER_HOST + '/app/v0/member/pm25';
    
    //地图相关
    static SEARCH_COMMUNITY = PathUtil.SERVER_HOST + '/app/v0/member/searchCommunity';

    //我的设备
    static BIND_DEVICE = PathUtil.SERVER_HOST + '/app/v0/member/bindingMember';
    static DEVICE_LIST = PathUtil.SERVER_HOST + '/app/v0/member/deviceList';
    static DEVICE_RELIEVE = PathUtil.SERVER_HOST + '/app/v0/member/relieveDevice';
    static DEVICE_SERVICE = PathUtil.SERVER_HOST + '/app/v0/member/servicePackage';
    
    //更多
    static UPDATE_PWD_URL = PathUtil.SERVER_HOST + '/app/v0/member/changePwd';
    static GET_NOTICE_URL = PathUtil.SERVER_HOST + '/app/v0/member/notice';
    //更新
    static APP_UPDATE = PathUtil.SERVER_HOST + '/app/update';
    
    //设备汇总
    static DEVICE_COUNT_URL = PathUtil.SERVER_HOST + '/app/v0/member/deviceCount';
}
