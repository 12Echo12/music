import { FC } from "react";
import style from './TabBar.module.css'
import { useLocation, useRoutes } from 'react-router-dom'
import React from "react";



interface TabBarProps {
    route?: boolean //是否开启路由模式
    children?: React.ReactElement<any, any>[]
    activeIndex?: number | string // 当前激活的tabBarItem的索引
}


const TabBar: FC<TabBarProps> = (props) => {
    const { route = false } = props
    let activeIndex = props.activeIndex
    let children = props.children
    activeIndex = route ? useLocation().pathname : activeIndex

    children = children?.map((o, i) => {
        return React.cloneElement(o, {
            active: route
                ? 
                
        })
    })
    return (
        <div className={style.tabBar}>{children}</div>
    )
}

export default TabBar