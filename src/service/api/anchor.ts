// 电台相关api
import axRequest from '../index'

enum ANCHOR_API {
    // 获取分类电台推荐
    GET_ANCHOR_RECOMMEND = '/dj/recommend',
}

export function getAnchorRecommend(id:string) {
    return axRequest.get({
        url: ANCHOR_API.GET_ANCHOR_RECOMMEND,
        params: {
            id
        }
    })
}