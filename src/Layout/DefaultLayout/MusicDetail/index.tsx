import { FC, useState } from "react";
import style from './index.module.css'

import { publicSlice } from '../../../redux/publicSlice/slice'
import store, { RootState } from '../../../redux/store'


import styled from 'styled-components'
import { ArrowsAltOutlined, DownOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useSelector } from "react-redux";

// 全屏
import fullScreen from '../fullScreen/index'
import ChangPian from "../../../components/ChangPian";
import Lyric from "../../../components/lyric";
// 评论
import CommentTabPage from '../../../pages/component/commentTabPage'
import Comment from '../../../components/CommentList'
import ArNameItem from "../../../pages/component/arNameItem";


const MusicDetail: FC = () => {

    const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
    const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
    const { song, lyric } = useSelector((state:RootState) => state.musicControl.musicInfo)

    const [parsedLrc, setParseLrc] = useState<any[]>([])
    const [songHeaderInfoShow, setsongHeaderInfoShow] = useState(false)

    const musicDetailEl = document.getElementById('musicDetail')

    // 关闭该组件
    const handleClose = () => {
        store.dispatch(publicSlice.actions.setSongDetailOpen(false))
    }

    // 换页后重新滚到头部
    const changePage = (i: number) => {
        musicDetailEl?.scrollTo({ top: 450, behavior: 'smooth' })
    }

    return (
        <div className={style.musicDetail}>
            {/* 歌曲详情之头部cut */}
            <div className={style.musicDetailHeader}>
                <MusicDetailHeader className={style.headerBg} bgImg={song?.al?.picUrl} />
                <div onClick={handleClose} className={style.upBtn}>
                    <DownOutlined />
                </div>
                <div className={style.musicDetailCutIcons}>
                    <div
                        className={`${style.headerSongInfo} ${songHeaderInfoShow ? style.headerSongInfoShow : ''
                            }`}
                    >
                        <div className={`${style.songName} line1`}>{song?.name}</div>
                        <div className={`${style.ar} line1`}>
                            {song?.ar?.map((item: any) => item.name).join('/')} - {song?.al?.name}
                        </div>
                    </div>
                </div>
                <div onClick={fullScreen.create} className={style.leftBar}>
                    <ArrowsAltOutlined className={style.leftBarIcon} />
                    全屏纯享
                </div>
            </div>
            {/* 歌曲详情部分下部分 */}
            <div id='musicDetail' className={style.content}>
                {/* 歌曲信息部分 */}
                <div className={style.songInfoArea}>
                    {/* 歌名 歌手部分 */}
                    <div className={style.songBaseInfo} id='songBaseInfo'>
                        <div className={`${style.songName} line1`}>{song?.name}</div>
                        <div className={`${style.ar} line1`}>
                            <ArNameItem artists={song?.ar} /> - {song?.al?.name}
                        </div>
                    </div>
                    {/* 唱片部分 */}
                    <div className={`${style.songPicWrap} `}>
                        <ChangPian isPlaying={isPlaying} songPicUrl={song?.al?.picUrl} />
                    </div>
                    {/* 歌词部分 */}
                    <div className={style.lrc}>
                        <Lyric lrc={parsedLrc} currentTime={currentTime} _uid='detailPage' />
                    </div>
                </div>
                {/* 评论部分 */}
                <div className={style.comment}>
                    <CommentTabPage onPageChange={changePage} id={song?.id} type='Song' />
                </div>
            </div>
        </div>
    )
}

export default MusicDetail

// 背景
const MusicDetailHeader = styled.div<{ bgImg: string }>`
  background-image: ${(props) => `url(${props.bgImg})`};
  background-position: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(80px);
`