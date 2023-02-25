import { CloudDownloadOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Like from "../../components/Like";
import Loading from "../../components/Loading";
import MuTable, { TableColumnType } from "../../components/MuTable";
import Toast from "../../components/Toast";
import { AddMusic, SetMusicList } from "../../controller/musicController";
import { parseSecondToTime } from "../../utils";
import ArNameItem from "../component/arNameItem";
import CommentTabPage from "../component/commentTabPage";
import PlayListHeader, { PLAY_LIST_TYPE } from "../component/PlayListHeader";
import TabBar from "../component/tabBar";
import TabBarItem from "../component/tabBarItem";

import { useSongSheet } from './hooks/useSongSheet'
import { downLoadMusic, getPlaylistDetail } from '../../service/api/music'
// ??????
import { subPlayList } from '../../service/api/reLoginApi/songSheets'

import style from './index.module.css'

interface SongSheetProps { }

const SongSheet: FC<SongSheetProps> = () => {

    const { id } = useParams()
    const { songSheetInfo, tabList, handleGetPlaylistDetail, loading } = useSongSheet(id!)

    const [activeIndex, setActiveIndex] = useState<string>('playList')
    const handleChangeTab = (id: string) => setActiveIndex(id)
    
    // ??????
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
                return <ArNameItem artists={data?.ar} />
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
        const { tracks } = songSheetInfo
        SetMusicList(tracks, 'musicList')
    }

    const toggleSubscribe = () => {
        subPlayList(songSheetInfo.id, songSheetInfo.subscribed ? 0 : 1).then(() => {
            Toast.success(songSheetInfo.subscribed ? '取消收藏成功' : '收藏成功')
            handleGetPlaylistDetail()
        })
    }
    
    if (loading) {
        return <Loading />
    } 
    return (
        <div className={style.songSheet}>
            <PlayListHeader
                handlePlayList={handlePlayList}
                listInfo={songSheetInfo}
                type={PLAY_LIST_TYPE.songSheet}
                toggleSubscribe={toggleSubscribe}
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
            <div className={style.songSheetContent}>
                {activeIndex === 'playList' && (
                    <MuTable
                        onColDoubleClick={onColDoubleClick}
                        columns={columns}
                        data={songSheetInfo?.tracks || []}
                        showIdx
                    />
                )}
                {activeIndex === 'comment' && (
                    <div>
                        <CommentTabPage id={id!} type='PlayList' />
                    </div>
                )}
                {activeIndex === 'favoriter' && <div>收藏者</div>}
            </div>
        </div>
    )
}

export default SongSheet