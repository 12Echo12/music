import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'

class AxRequest{
    instance: AxiosInstance
    // 定义属性为 Map 类型
    pendingRequests: Map<
        string,
        {
            controller: AbortController
            url: string
        }
        > = new Map()
    // 拦截器
    interceptors?: AxRequestInterceptor
    loading?: any
    
}