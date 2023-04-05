// 主页相关api
import axios from 'axios'
import axRequest from '../index'

enum HOME_API {
    //获取轮播图
    GET_BANNER = '/banner?type=2'
}

//获取轮播图
export function getBanner() {
    return axios.get(`http://localhost:3000/banner?type=3`).then(res => {
        return res.data
    })
}