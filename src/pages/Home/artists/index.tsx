import { FC, useCallback, useEffect, useRef, useState } from "react";
import style from './index.module.css'


import TabBar from "../../component/tabBar";
import TabBarItem from "../../component/tabBarItem";
import ArtistItem from '../../component/artistItem'

// 后端接口，获取歌手展示信息！！！！
import { getArtistCategory } from '../../../service/api/artist'

import { type, area, initial } from './config'
import { isScrollBottom } from '../../../utils'

interface ArtistsProps { }

const Artists: FC<ArtistsProps> = () => {

    // 导航栏选中高亮效果！！！
    const [typeActive, setTypeActive] = useState(-1)
    const [areaActive, setAreaActive] = useState(-1)
    const [initialActive, setInitialActive] = useState('-1')

    // 不同模块下要显示的歌手！！！！
    const [artists, setArtists] = useState<any[]>([])

    // 当前的模块的page
    const [curPage, setCurPage] = useState(1)

    // 是否要获取更多歌手信息！！！
    const isLock = useRef(false)

    // 默认获取歌手信息
    useEffect(() => {
        setCurPage(1)
        getArtistCategory({
            type: typeActive,
            area: areaActive,
            initial: initialActive,
            curPage: 1
        }).then((res) => {
            setArtists(res.artists)
        })
    }, [typeActive, areaActive, initialActive])


    // 4 . fetchMore事件
    const fetchMore = useCallback(() => {
        if (isLock.current) return
        isLock.current = true
        getArtistCategory({
            type: typeActive,
            area: areaActive,
            initial: initialActive,
            curPage: curPage + 1
        })
            .then((res) => {
                setCurPage(curPage + 1)
                setArtists((ars) => [...ars, ...res.artists])
                console.log(artists)
            })
            .finally(() => {
                isLock.current = false
            })
    }, [curPage, typeActive, areaActive, initialActive])

    // 3 . addPage 事件 ，接着触发 fetchMore()
    const addPage = useCallback(() => {
        fetchMore()
    }, [fetchMore])


    // 2 . 监听绑定的元素 ，如果滚到底就触发 addPage（）事件！！
    const scrollAddPage = useCallback(() => {
        const mainContent = document.querySelector('#mainContent')
        const isBottom = isScrollBottom(mainContent!)

        if (isBottom) {
            addPage()
        }
    }, [addPage])



    // 1  . 绑定滚动监听事件
    useEffect(() => {
        // ？？？？ mainContent 是 what??????
        const mainContent = document.querySelector('#mainContent')
        mainContent?.addEventListener('scroll', scrollAddPage)

        return () => {
            mainContent?.removeEventListener('scroll', scrollAddPage)
        }
    }, [scrollAddPage])


    return (
        <div>
            <div className={style.headerTabs}>
                {/* 语言导航栏模块！！！ */}
                <div className={style.tabItem}>
                    <div className={style.tabItemTitle}>语言：</div>
                    <TabBar activeIndex={typeActive}>
                        {type.map((item, index) => {
                            return (
                                <TabBarItem
                                    // ？？？？？
                                    tabBarItemClassName={style.tabBarItem}
                                    tabBarItemActiveClassName={style.tabBarItemActive}
                                    key={item.id}
                                    id={item.id}
                                    // 选中高亮
                                    onClick={() => setTypeActive(item.id)}
                                >
                                    {item.name}
                                </TabBarItem>
                            )
                        })}
                    </TabBar>
                </div>
                {/* 分类导航栏模块！！！ */}
                <div className={style.tabItem}>
                    <div className={style.tabItemTitle}>分类：</div>
                    <TabBar activeIndex={areaActive}>
                        {area.map((item, index) => {
                            return (
                                <TabBarItem
                                    tabBarItemClassName={style.tabBarItem}
                                    tabBarItemActiveClassName={style.tabBarItemActive}
                                    key={item.id}
                                    id={item.id}
                                    onClick={() => setAreaActive(item.id)}
                                >
                                    {item.name}
                                </TabBarItem>
                            )
                        })}
                    </TabBar>
                </div>
                {/* 筛选导航栏模块！！！ */}
                <div className={style.tabItem}>
                    <div className={style.tabItemTitle}>筛选：</div>
                    <TabBar activeIndex={initialActive}>
                        {initial.map((item, index) => {
                            return (
                                <TabBarItem
                                    tabBarItemClassName={style.tabBarItem}
                                    tabBarItemActiveClassName={style.tabBarItemActive}
                                    key={item.id}
                                    id={item.id}
                                    onClick={() => setInitialActive(item.id)}
                                >
                                    {item.name}
                                </TabBarItem>
                            )
                        })}
                    </TabBar>
                </div>
            </div>
            {/* 歌手Item */}
            <div className={style.artistItem}>
                {artists?.map((item, index) => {
                    return <ArtistItem key={item.id} pic={item.picUrl} name={item.name} id={item.id} />
                })}
            </div>
        </div>
    )
}

export default Artists