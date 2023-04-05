// 提供的是Login组件展示的方法

import Login from './Login'
import { createRoot, Root } from 'react-dom/client'

function createLogin(el: any) {
    return {
        destroy: () => {
            window.history.back();
        },
        create: () => {
            window.location.href='#/login'
        }
    }
}

// 重要！！ 自己带参数了
export default createLogin(<Login />)