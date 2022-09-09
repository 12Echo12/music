import React, { FC, useEffect } from 'react'
import style from './MusicControl.module.css'
import store, { RootState } from '../../redux/store'
import ProgressBar from '../progressBar/ProgressBar'

// 小工具 ，将时间转换成秒进行表示
import { parseSecondToTime } from '../../utils'

// 字体图标
import { createFromIconfontCN } from '@ant-design/icons'
import { StepBackwardOutlined } from '@ant-design/icons'
// 切换歌曲
import { changeMusic } from '../../controller/musicController'
// 暂停歌曲
import audioInstance from '../../controller/musicPlayer'

// 引入全局状态
import {
    getSongInfoAndSet,
    musicControlSlice,
    MusicControlState
} from '../../redux/musicControl/slice'
import { musicListSlice, MusicListState } from '../../redux/musicList/slice'
import { useSelector } from 'react-redux'

interface MusicControlProps { } 

const IconFont = createFromIconfontCN({
    scriptUrl: 'https://at.alicdn.com/t/font_3370146_f9nlawuexbc.js'
})

const handleTogglePlay = () => {
    console.log('toggle')

    audioInstance.togglePlay()
}
const MusicCintrol: FC<MusicControlProps> = () => {
    const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
    const duration = useSelector((state: RootState) => state.musicControl.duration)
    const currentTime  = useSelector((state: RootState) => state.musicControl.currentTime)
    const progress = useSelector((state: RootState) => state.musicControl.progress)
    const isAdjusting = useSelector((state: RootState) => state.musicControl.isAdjusting)
    const handleTogglePlay = () => {
        console.log('toggle')

        audioInstance.togglePlay()
    }
    const setPercent = (percent: number) => {
        audioInstance.setCurrentTime((percent / 100) * duration)
        setProgress(percent)
    }

    const setCurTime = (curTime:number) => {
        store.dispatch(musicControlSlice.actions.setCurrentTime(curTime))
    }
    const setIsPlay = (isPlay:boolean) => {
        store.dispatch(musicControlSlice.actions.setIsPlaying(isPlay))
    }
    const setDuration = (duration: number) => {
        store.dispatch(musicControlSlice.actions.setDuration(duration))
    }
    const setProgress = (progress: number) => {
        store.dispatch(musicControlSlice.actions.setProgress(progress))
    }
    const setAdjust = (adjust:boolean) => {
        store.dispatch(musicControlSlice.actions.setAdjusting(adjust))
    }
    return (
        <div className={style.musicControl}>
            <div className={style.top}>
                <IconFont
                    onClick={() => changeMusic(-1)}
                    className={style.icon}
                    type='icon-play-previous'
                />
                <IconFont
                    className={`${style.playIcon} ${style.icon}`}
                    onClick={handleTogglePlay}
                    type={isPlaying ? 'icon-pause' : 'icon-play'}
                />
                <IconFont onClick={() => changeMusic(1)} className={style.icon} type='icon-play-next' />
            </div>

            <div className={style.bottom}>
                <div className={style.curTime}>{parseSecondToTime(currentTime)}</div>
                <div style={{ margin: '0 15px', width: '300px' }}>
                    <ProgressBar
                        setPercent={setPercent}
                        percent={progress}
                        underPercent={bufferProgress}
                        onChangeStart={() => setAdjust(true)}
                        onChangeEnd={() => setAdjust(false)}
                    />
                </div>
                <div className={style.totalTime}>{parseSecondToTime(duration)}</div>
            </div>
        </div>
    )
}

export default MusicCintrol