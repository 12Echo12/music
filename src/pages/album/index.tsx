import { CloudDownloadOutlined } from "@ant-design/icons";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Like from "../../components/Like";
import MuTable, { TableColumnType } from "../../components/MuTable";
import { AddMusic, SetMusicList } from "../../controller/musicController";
import { downLoadMusic } from "../../service/api/music";
import { parseSecondToTime } from "../../utils";
import CommentTabPage from "../component/commentTabPage";
import PlayListHeader, { PLAY_LIST_TYPE } from "../component/PlayListHeader";
import TabBar from "../component/tabBar";
import TabBarItem from "../component/tabBarItem";

import { useAlbum } from './hooks/useAlbum'

import style from './index.module.css'

import { SongSheetType } from '../../type/songSheet'
import { comment_type } from '../../service/api/comment'


interface AlbumProps{}

const Album: FC<AlbumProps> = () => {

    // 先根据路径拿到
    const { id } = useParams()
    const { albumInfo, tabList, handleGetPlaylistDetail } = useAlbum(id!)
    // 将响应过来的信息转化为 头部有用的信息传给它
    const parseHeaderInfo = useMemo((): Partial<SongSheetType> => {
        if (!albumInfo) {
            return {} as SongSheetType
        }
        const { album } = albumInfo
        return {
            id: album.id,
            name: album.name,
            createTime: album.publishTime,
            creator: {
                nickname: album.artist.name,
                avatarUrl: ''
            },
            coverImgUrl: album.picUrl
        }
    }, [albumInfo])

    const [activeIndex, setActiveIndex] = useState<string>('playList')

    const handleChangeTab = (id: string) => setActiveIndex(id)

    // ？？？？
    const location = useLocation()
    useEffect(() => {
        if (location.pathname.includes('/songSheet')) {
            setActiveIndex('playList')
        }
    }, [location])

    const columns: TableColumnType[] = [
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            render: (data: any, idx: number) => {
                return (
                    <div className={style.tableHandle}>
                        <Like id={data.id} />

                        <CloudDownloadOutlined
                            onClick={() => {
                                downLoadMusic(
                                    data.id,
                                    data.name + '-' + data.ar.map((item: any) => item.name).join('/')
                                )
                            }}
                            className={'defaultClickIcon'}
                        />
                    </div>
                )
            },
            width: (2 / 24) * 100 + '%',
            align: 'center'
        },
        {
            title: '歌曲',
            dataIndex: 'name',
            key: 'name',
            render: (data: any) => {
                return <span className={`line1`}>{data.name}</span>
            },
            width: (9 / 24) * 100 + '%',
            align: 'left'
        },
        {
            title: '歌手',
            dataIndex: 'ar',
            key: 'ar',
            render: (data: any) => {
                return <span className={`line1`}>{data.ar.map((item: any) => item.name).join('/')}</span>
            },
            width: (5 / 24) * 100 + '%',
            align: 'left'
        },
        {
            title: '专辑',
            dataIndex: 'al',
            key: 'al',
            render: (data: any) => {
                return <span className={`line1`}>{data.al.name}</span>
            },
            width: (6 / 24) * 100 + '%',
            align: 'left'
        },
        {
            title: '时长',
            dataIndex: 'dt',
            key: 'dt',
            render: (data: any) => {
                return <span>{parseSecondToTime(data.dt / 1000)}</span>
            },
            width: (2 / 24) * 100 + '%',
            align: 'center'
        }
    ]

    const onColDoubleClick = (data: any) => {
        AddMusic(data)
    }
    const handlePlayList = () => {
        if (!albumInfo) {
            return
        }
        const { songs } = albumInfo
        SetMusicList(songs, 'musicList')
    }

    // 收藏功能
    const toggleSubscribe = () => {
        // if (albumInfo) {
        //   subPlayList(albumInfo.album?.id, albumInfo?.album?.subscribed ? 0 : 1).then(() => {
        //     Toast.success(albumInfo.subscribed ? '取消收藏成功' : '收藏成功')
        //     handleGetPlaylistDetail()
        //   })
        // }
    }

    return (
        <div className={style.songSheet}>
            <PlayListHeader
                handlePlayList={handlePlayList}
                listInfo={parseHeaderInfo}
                type={PLAY_LIST_TYPE.album}
                //  收藏功能？？？？
                // toggleSubscribe={toggleSubscribe}
            />
            <TabBar activeIndex={activeIndex}>
                {tabList.map((item, index) => {
                    return (
                        <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
                            {item.title}
                        </TabBarItem>
                    )
                })}
            </TabBar>
            {/* 三个展示部分！！！！！ */}
            <div className={style.songSheetContent}>
                {activeIndex === 'playList' && (
                    <MuTable
                        onColDoubleClick={onColDoubleClick}
                        columns={columns}
                        data={albumInfo?.songs || []}
                        showIdx
                    />
                )}
                {activeIndex === 'comment' && (
                    <div>
                        <CommentTabPage id={id!} type='Album' />
                    </div>
                )}
                {activeIndex === 'favoriter' && <div>收藏者</div>}
            </div>
        </div>   
    )
}

export default Album