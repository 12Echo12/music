import { SiderProps } from 'antd'
import React, { Children, FC, FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'
import style from './index.module.css'

interface SiderBarProps{
    children: React.ReactElement<any, any>[] | React.ReactElement<any, any>
    activeId?: number | string
    route?: boolean
}

const SideBar: FC<SiderBarProps> = (props) => {
    // 获取传过来的props属性
    const { route = false } = props
    let activeId = props.activeId
    // ????  
    let children = props.children
    let id = useLocation().pathname;
    activeId = route ? id : activeId
    
    // 看 children 是否是数组，不是的话让其变成数组
    if (!Array.isArray(children)) {
        children = [children]
    }
    children = children?.map((o, i) => {
        return React.cloneElement(o, {
            activeId,
            route
        })
    })
    return <div className={style.sideBar}>{children}</div>
}

export default SideBar