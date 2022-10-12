import { DashOutlined, DeleteOutlined, StepForwardOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from './index.module.css'
import Like from "../../components/Like";
import Lyric from "../../components/lyric";
import store, { RootState } from "../../redux/store";
import ArNameItem from "../component/arNameItem";
import CommentTabPage from "../component/commentTabPage";

import { changeMusic, setMusicList } from '../../controller/musicController'
import { useListControl } from "../../controller/listController";
import { publicSlice } from "../../redux/publicSlice/slice";
import { parseLrc } from '../../utils'

import { getSongDetail } from '../../service/api/music'
import { getPersonalFm } from '../../service/api/reLoginApi/songSheets'
import { fmListSlice } from "../../redux/fmList/slice";

import { comment_type } from '../../service/api/comment'
import { AlbumType } from '../../type/album'
import SongImgChangeSwriper from "../component/songImgChangeSwriper";

interface PersonalFmProps { }

export interface PersonalFmItem {
    album: AlbumType
    name: string
    id: number
}

const PersonalFm: FC<PersonalFmProps> = () => {

    // 从公共状态中得到 播放列表
    const { list: personalFmList, current } = useSelector((state: RootState) => state.fmList)

    const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
    const { song, lyric } = useSelector((state: RootState) => state.musicControl.musicInfo)
    const curListType = useSelector((state: RootState) => state.public.curListType)

    const [parsedLrc, setParseLrc] = useState<any[]>([])
    
    const navigate = useNavigate()

    // 如果播放列表不是 fmList 格式的，换成 fmList 形式
    useEffect(() => {
        const listControl = useListControl()
        const { current } = listControl.getList()
        if (current === -1 || curListType !== 'fmList') {
            store.dispatch(publicSlice.actions.setCurListType('fmList'))
            getPersonalFm().then((res) => {
                // setPersonalFmList(res.data)
                setMusicList(res.data, 'fmList')
                // store.dispatch(fmListSlice.actions.setList(res.data))
            })
        }
    }, [])
    // 查看是否播放到 fmList 的最后一首，是的话去获取更多 fmList
    useEffect(() => {
        checkNeedFeachFm(current + 1)
    }, [personalFmList, current])

    const checkNeedFeachFm = (idx: number) => {
        if (idx === personalFmList.length - 1) {
            getPersonalFm().then((res) => {
                store.dispatch(fmListSlice.actions.setList(res.data))
            })
        }
    }

    // 将响应的歌词（字符串）转换为数组的格式
    useEffect(() => {
        lyric != '' && setParseLrc(parseLrc(lyric))
    }, [song])

    // 点击图片事件
    const setCurIndex = (idx: number) => {
        changeMusic(idx)
        // store.dispatch(fmListSlice.actions.setCurrent(idx))
    }

    // 评论换页后还要回到头部
    const changePage = (idx: number) => {
        const mainContentEl = document.querySelector('#mainContent')
        const commentAreaTop = document.getElementById('commentArea')?.offsetTop

        mainContentEl?.scrollTo({ top: commentAreaTop, behavior: 'smooth' })
    }

    const deleteCur = () => {
        store.dispatch(fmListSlice.actions.delCurrent())

        changeMusic(0)
    }

    const handleChangIdx = () => {
        if (current === personalFmList.length - 1) {
            return
        }

        setCurIndex(1)
    }

    return (
        <div id='fmContainer' className={`baseContainer ${style.personFmWrap}`}>
            <div className={style.songArea}>
                <div className={style.songAreaLeft}>
                    <div className={style.songImgChangeSwriper}>
                        <SongImgChangeSwriper
                            songList={personalFmList}
                            curIndex={current}
                            setCurIndex={setCurIndex}
                        />
                    </div>
                    <div className={style.songImgHandle}>
                        <div className={style.handleItem}>
                            <Like id={song.id} />
                        </div>
                        <div onClick={deleteCur} className={style.handleItem}>
                            <DeleteOutlined />
                        </div>
                        <div onClick={handleChangIdx} className={style.handleItem}>
                            <StepForwardOutlined />
                        </div>
                        <div className={style.handleItem}>
                            <DashOutlined />
                        </div>
                    </div>
                </div>
                <div className={style.songAreaRight}>
                    <div className={style.songAreaRightHeader}>
                        <div className={`${style.songName} line1`}>{song?.name}</div>
                        <div className={style.songOther}>
                            <div className='line1'>专辑：{song?.al?.name}</div>
                            <div className='line1'>
                                歌手：
                                <ArNameItem artists={song?.ar} />
                            </div>
                        </div>
                    </div>
                    <div className={style.lrc}>
                        <Lyric lrc={parsedLrc} currentTime={currentTime} _uid={'fmPage'} />
                    </div>
                </div>
            </div>
            <div id='commentArea'>
                <CommentTabPage onPageChange={changePage} id={song?.id} type='Song' />
            </div>
        </div>
    )
}

export default PersonalFm


