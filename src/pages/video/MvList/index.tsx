import { FC, useState } from "react";
import LinkTab from "../../component/linkTab";
import TabBar from "../../component/tabBar";
import TabBarItem from "../../component/tabBarItem";
import VideoListItem from "../../component/VideoListItem";


import { useMVFirstList } from '../../../hooks/useMVFirstList'

import style from './index.module.css'

interface MVListProps { }

const MVList: FC<MVListProps> = () => {

    const [typeActive, setTypeActive] = useState('')
    // 根据后端接口接收返回的mv列表
    const [mvFirst = [], mvFirstLoading] = useMVFirstList(typeActive)
    const [mvNetease = [], mvNeteaseLoading] = useMVFirstList(typeActive)

    const type = ['内地', '港台', '欧美', '日本', '韩国']

    return (
        <div>
            <div className={style.contentItem}>
                <div className={style.header}>
                    <LinkTab title='最新MV' to='' />
                    <TabBar activeIndex={typeActive}>
                        {type.map((item, index) => {
                            return (
                                <TabBarItem
                                    tabBarItemClassName={style.tabBarItem}
                                    tabBarItemActiveClassName={style.tabBarItemActive}
                                    key={item}
                                    id={item}
                                    onClick={() => setTypeActive(item)}
                                >
                                    {item}
                                </TabBarItem>
                            )
                        })}
                    </TabBar>
                </div>
                <div className={style.ListWrap}>
                    {mvFirst.map((item, index) => {
                        return (
                            <VideoListItem
                                key={index}
                                name={item.name}
                                playCount={item.playCount}
                                img={item.cover}
                                id={item.id}
                                type='mv'
                                artists={item.artists}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={style.contentItem}>
                <div className={style.header}>
                    <LinkTab title='网易出品MV' to='' />
                </div>
                <div className={style.ListWrap}>
                    {mvNetease.map((item, index) => {
                        return (
                            <VideoListItem
                                key={index}
                                name={item.name}
                                playCount={item.playCount}
                                img={item.cover}
                                id={item.id}
                                type='mv'
                                artists={item.artists}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MVList