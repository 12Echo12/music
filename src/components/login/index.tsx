// 提供的是Login组件展示的方法

import Login from './Login'
import { createRoot, Root } from 'react-dom/client'
function createLogin(el: any) {
    const node = document.createElement('div')
    let root: Root | null = null
    return {
        destroy: () => {
            root!.unmount()
        },
        create: () => {
            root = createRoot(node)
            document.body.appendChild(node)
            root!.render(el)
        }
    }
}

// 重要！！ 自己带参数了
export default createLogin(<Login />)