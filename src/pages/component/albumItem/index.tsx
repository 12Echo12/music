import { CloudDownloadOutlined, FolderAddOutlined, PlayCircleOutlined,  RightOutlined } from "@ant-design/icons";
import { FC, useMemo, useState } from "react";
import Like from "../../../components/Like";
import MuTable, { TableColumnType } from "../../../components/MuTable";

import style from './index.module.css'

// ?????
import { downLoadMusic } from '../../../service/api/music'
import { parseSecondToTime } from "../../../utils";
// setMusicList????
import { AddMusic, SetMusicList } from "../../../controller/musicController";
import { useNavigate } from "react-router-dom";

import { SongType } from '../../../type/song'

interface AlbumItemProps {
    title: string
    songs: SongType[]
    pic: string
    albumId?: string
    defalutFold?: boolean
}



const AlbumItem: FC<AlbumItemProps> = ({ title, songs, pic, defalutFold = true, albumId }) => {


    const handlePlayList = () => {
        SetMusicList(songs, 'musicList')
    }

    const onColDoubleClick = (data: any) => {
        AddMusic(data)
    }

    const [fold, setFold] = useState(defalutFold)
    
    // 是否折叠 ，折叠就只显示 10 首
    const sliceSongs = useMemo(() => {
        return fold ? songs.slice(0, 10) : songs
    }, [songs, fold])

    const columns: TableColumnType<SongType>[] = [
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            render: (data, idx: number) => {
                return (
                    <div className={style.tableHandle}>
                        <Like id={data.id} />

                        <CloudDownloadOutlined
                            onClick={() => {
                                downLoadMusic(
                                    data.id,
                                    data.name + '-' + data?.ar?.map((item: any) => item.name).join('/')
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

            align: 'left'
        },
        {
            title: '专辑',
            dataIndex: 'al',
            key: 'al',
            render: (data) => {
                return <span className={`line1`}>{data.al?.name}</span>
            },
            width: (6 / 24) * 100 + '%',
            align: 'left'
        },
        {
            title: '时长',
            dataIndex: 'dt',
            key: 'dt',
            render: (data) => {
                return <span>{parseSecondToTime(data.dt / 1000)}</span>
            },
            width: (2 / 24) * 100 + '%',
            align: 'center'
        }
    ]

    const navigate = useNavigate()
    const handleToAlbum = (albumId: string) => {
        navigate(`/album/${albumId}`)
    }
    const viewAll = () => {
        albumId ? handleToAlbum(albumId) : setFold(!fold)
    }

    return (
        <div className={style.albumItemWrap}>
            <div className={style.left}>
                <img src={pic + '?param=300y300'} alt='' />
            </div>
            <div className={style.right}>
                <div className={style.rightTop}>
                    <div className={style.rightTopTitle}>{title}</div>
                    <div className={style.handleIcon}>
                        <PlayCircleOutlined onClick={handlePlayList} className={`defaultClickIcon`} />
                        <FolderAddOutlined className={`defaultClickIcon`} />
                    </div>
                </div>
                <MuTable
                    height={30}
                    onColDoubleClick={onColDoubleClick}
                    columns={columns}
                    data={sliceSongs}
                    showIdx
                />
                {fold === true && songs.length > 10 && (
                    <div onClick={viewAll} className={style.footer}>
                        查看全部{songs.length}首
                        <RightOutlined />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AlbumItem