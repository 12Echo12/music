import { FC, useState } from "react";
import style from './MusicDetail.module.css'

import { publicSlice } from '../../../redux/publicSlice/slice'
import store, { RootState } from '../../../redux/store'


import styled from 'styled-components'
import { ArrowsAltOutlined, DownOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useSelector } from "react-redux";

// 全屏
import fullScreen from '../fullScreen/index'


const MusicDetail: FC = () => {

    const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
    const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
    const { song, lyric } = useSelector((state:RootState) => state.musicControl.musicInfo)

    const [parsedLrc, setParseLrc] = useState<any[]>([])
    const [songHeaderInfoShow, setsongHeaderInfoShow] = useState(false)

    // 关闭该组件
    const handleClose = () => {
        store.dispatch(publicSlice.actions.setSongDetailOpen(false))
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