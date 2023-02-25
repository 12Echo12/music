import { FC } from "react";
import style from './index.module.css'
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
    let id = useLocation().pathname
    activeIndex = route ? id : activeIndex

    children = children?.map((o, i) => {
        // 元素克隆主要为了合并一些属性
        return React.cloneElement(o, {
            active: route
                ? activeIndex === o.props.path || o.props.regPath?.test(activeIndex)
                : activeIndex === o.props.id  
        })
    })
    return (
        <div className={style.tabBar}>{children}</div>
    )
}

export default TabBar