import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import TabBar from "../component/tabBar";
import TabBarItem from "../component/tabBarItem";

import Toast from '../../components/Toast'

import style from './index.module.css'

interface VideoProps { }

const Video: FC<VideoProps> = () => {

    const [tabList, setTabList] = useState([
        {
            title: '视频',
            path: '/video/v'
        },
        {
            title: 'MV',
            path: '/video/mv'
        }
    ])


    return (
        <div className={style.video}>
            <TabBar route={true}>
                {tabList.map((item, index) => {
                    return (
                        <TabBarItem key={index} path={item.path}>
                            {item.title}
                        </TabBarItem>
                    )
                })}
            </TabBar>
            {/* 子组件的占位符 */}
            <div className={style.videoContent}>
                <Outlet />
            </div>
        </div>
    )
}

export default Video