import { FC, useEffect, useMemo, useState } from "react";
import style from './index.module.less'

import TabBar from "../../component/tabBar";
import TabBarItem from "../../component/tabBarItem";
import VideoListItem from '../../component/VideoListItem'
import HeaderButton from '../../component/headerButton'
import { RightOutlined } from "@ant-design/icons";

import { useScrollBottomMore } from '../../../hooks/useScrollBottomMore'
import { useVideoGroupList } from '../../../hooks/useVideoGroupList'
import { getVideoAllList, getVideoCategoryVideoList } from '../../../service/api/video'

import { VideoType } from '../../../type/video'

interface VideoListProps { }

const VideoList: FC<VideoListProps> = () => {


    // 是否展示下拉框
    const [showSelectPanel, setShowSelectPanel] = useState(false)
    // 高亮的index
    const [typeActive, setTypeActive] = useState(58100)
    // 要展示的 video 列表
    const [videoList, setVideoList] = useState<VideoType[]>([])

    const [curPage, setCurPage] = useState(1)

    const [groupList, categoryList, loading] = useVideoGroupList()

    const activeName = useMemo(() => {
        return typeActive === -1 ? '全部视频' : groupList.find((item) => item.id === typeActive)?.name
    }, [groupList, typeActive])

    // 绑定监听window的点击事件
    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            //查询是否点击到了侧边栏
            const videoListHeaderLeft = document.querySelector('#videoListHeaderLeft')

            if (e.path.includes(videoListHeaderLeft)) {
            } else {
                setShowSelectPanel(false)
            }
        })
    }, [])

    const fetchVideoList = useMemo(() => {
        return typeActive !== -1
            ? async (curPage: number) => {
                await getVideoCategoryVideoList(typeActive, curPage).then((res) => {
                    if (res.code !== 200) {
                        return
                    }
                    curPage === 1
                        ? setVideoList(res.datas.map((item: any) => item.data))
                        : setVideoList((videoList) => [
                            ...videoList,
                            ...res.datas.map((item: any) => item.data)
                        ])
                })
            }
            : async (curPage: number) => {
                await getVideoAllList(curPage).then((res) => {
                    if (res.code !== 200) {
                        return
                    }
                    curPage === 1
                        ? setVideoList(res.datas.map((item: any) => item.data))
                        : setVideoList((videoList) => [
                            ...videoList,
                            ...res.datas.map((item: any) => item.data)
                        ])
                })
            }
    }, [typeActive])

    useEffect(() => {
        setCurPage(1)
        fetchVideoList(1)
    }, [fetchVideoList])

    useScrollBottomMore(
        fetchVideoList,
        {
            curPage,
            setCurPage
        },
        [videoList]
    )

    return (
        <div className={style.content}>
            <div className={style.header}>
                <div id='videoListHeaderLeft' className={style.left}>
                    <HeaderButton
                        onClick={() => {
                            // 是否展示下拉选择框！！！
                            setShowSelectPanel(!showSelectPanel)
                        }}
                    >
                        <div style={{ margin: '0 10px' }}>
                            {activeName} <RightOutlined />
                        </div>
                    </HeaderButton>
                    {showSelectPanel && (
                        <div className={style.category}>
                            <div className={`${style.categoryHeader} `}>
                                <div
                                    className={`${style.cateItem} ${typeActive === -1 ? style.active : ''}`}
                                    onClick={() => {
                                        setShowSelectPanel(!showSelectPanel)
                                        setTypeActive(-1)
                                    }}
                                >
                                    全部视频
                                </div>
                                <div className={'divider'}></div>
                                <div className={style.categories}>
                                    {groupList.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className={`${style.cateItem} ${typeActive === item.id ? style.active : ''
                                                    }`}
                                                onClick={() => {
                                                    setShowSelectPanel(!showSelectPanel)
                                                    setTypeActive(item.id)
                                                }}
                                            >
                                                {item.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={style.right}>
                    <TabBar activeIndex={typeActive}>
                        {
                            categoryList?.map((item: any, index:number) => {
                                return (
                                    <TabBarItem
                                        tabBarItemClassName={style.tabBarItem}
                                        tabBarItemActiveClassName={style.tabBarItemActive}
                                        key={item.id}
                                        id={item.id}
                                        onClick={() => setTypeActive(item.id)}
                                    >
                                        {item.name}
                                    </TabBarItem>
                                )
                            })
                          }
                    </TabBar>
                </div>
            </div>
            <div className={style.ListWrap}>
                {videoList?.map((item, index: number) => {
                    return (
                        <VideoListItem
                            key={index}
                            name={item.title}
                            playCount={item.playTime}
                            img={item.coverUrl}
                            id={item.vid}
                            type='video'
                            anthor={item.creator?.nickname}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default VideoList