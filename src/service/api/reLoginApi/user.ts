import axios from 'axios';
import axRequest from '../../index'

enum USER_API {
    // 获取用户信息
    GET_USER_INFO = '/user/detail'
}

// 获取用户信息
export function getUserInfo(uid: string|undefined) {
    return axios.get(`http://localhost:3000/user/detail?uid=8023474819`).then(res => {
        return res.data;
    })
}