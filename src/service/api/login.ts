import axios from 'axios'

enum LoginAPI {
    //获取二维码Key
    GET_QRCODE_KEY = '/login/qr/key',
    //生成二维码接口
    GET_QRCODE_IMAGE = '/login/qr/create',
    //检测二维码状态
    CHECK_QRCODE_STATUS = '/login/qr/check',
    //检测登录状态
    CHECK_LOGIN_STATUS = '/login/status',
    //获取用户歌单
    GET_USER_PLAYLIST = '/user/playlist'
}

//获取二维码key
export function getQRCodeKey() {
    return axios.get(`http://localhost:3000/login/qr/key`).then(res => {
        return res.data;
    })
     
}

//生成二维码
export function getQRCodeImage(key: string) {
    return axios.get(`http://localhost:3000/login/qr/create?key=${key}&qrimg`)
}

//检测二维码状态
export function checkQRCodeStatus(key: string) {
    return axios.get(`http://localhost:3000/login/qr/check?key=${key}`)
}

//检测登陆状态
export function checkLoginStatus() {
    return axios.get(`http://localhost:3000/login/status`).then(res => {
        console.log(res)
        return res.data;
    })
}

//获取用户歌单
export function getUserPlayList(uid: string | undefined) {
    return axios.get(`http://localhost:3000/user/playlist?uid=8023474819`).then(res => {
        return res.data;
    })
}
