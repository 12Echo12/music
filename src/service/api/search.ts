// 搜索相关api
import axios from 'axios'
import axRequest from '../index'

enum SEARCH_API {
    //获取热搜
    GET_HOT_SEARCH = '/search/hot/detail',
    //搜索
    GET_SEARCH_RESULT = '/cloudsearch',
    //搜索建议
    GET_SEARCH_SUGGEST = '/search/suggest'
}

//获取热搜
export function getHotSearch() {
    return axios.get('http://localhost:3000/search/hot/detail').then(res => {
        return res.data;
    })
}

export enum SEARCH_TYPE {
    SONGS = 1,
    ALBUMS = 10,
    ARTISTS = 100,
    PLAYLISTS = 1000,
    USERPROFILES = 1002,
    MVS = 1004,
    VIDEOS = 1006,
    RADIOS = 1009
}

//搜索
//type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
//(搜索声音返回字段格式会不一样)
export function getSearchResult(keywords: string, offset: number, type = 1, limit = 20) {
    return axios.get(`http://localhost:3000/cloudsearch/${keywords}/${type}/${limit}/${offset}`).then(res => {
        return res.data;
    })
}

//搜索建议
export function getSearchSuggest(keywords: string) {
    return axios.get(`http://localhost:3000/search/suggest?keywords=${keywords}`).then(res => {
        return res.data;
    })
}