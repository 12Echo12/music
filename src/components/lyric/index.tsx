import { FC, useEffect, useState } from "react"

import style from './index.module.css'
import styled from 'styled-components'
import { IconFont } from '../../assets/css/iconFont'
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import Toast from '../Toast'

// parseLrc 分析歌词 （parse是分析的意思）
import { parseLrc, parseSecondToTime } from '../../utils'
import audioInstance from '../../controller/musicPlayer'


interface LyricProps{
    lrc: {
        lrc: string
        time: number
    }[]
    currentTime: number
    _uid: string
    mode?: 'white' | 'black'
    itemHeight?: number
    itemFontSize?: number
    showControl?: boolean
    height?: number
}

const Lyric: FC<LyricProps> = ({
    lrc: parsedLrc,
    currentTime,
    _uid,
    mode,
    itemHeight = 36,
    itemFontSize,
    showControl = true,
    height = 300
}) => {

    // 添加状态：当前歌曲播放对应的那句歌词的 index
    const [curLrcIdx, setCurLrcIdx] = useState(0)
    // 添加状态：偏移事件，即播放的歌曲对应的那句歌词播放了几秒
    const [timeOffset, setTimeOffset] = useState(0)
    // 添加状态：是否停止滚动！！
    const [stopScroll, setStopScroll] = useState(false)
    // 添加状态：滚动到的歌词的 index
    const [scrollIdx, setScrollIdx] = useState(0)

    // 获取当前歌词的整个容器元素
    const lrcWrapEl = document.getElementById('lrcWrap' + _uid)

    // 歌曲播放的当前时间变化，就会重新去设置当前应该展示的歌词部分（即到哪一句歌词了）
    useEffect(() => {
        for (let i = 0; i < parsedLrc.length; i++) {
            // timeOffset是时间偏移
            if (currentTime + timeOffset < parsedLrc[i].time) {
                const curIdx = i - 1 >= 0 ? i - 1 : 0
                setCurLrcIdx(curIdx)

                //设置scroll 滚动 跟着歌词滚
                if (lrcWrapEl && !stopScroll) {
                    lrcWrapEl.scrollTo({
                        top: (curIdx + 1) * itemHeight - itemHeight / 2,
                        behavior: 'smooth'
                    })
                }
                break
            }
        }
    }, [currentTime])
    
    // 每当换一句歌词 ，就会将时间 timeOffSet 偏移重置为 0 （即当前）
    useEffect(() => {
        setTimeOffset(0)
    }, [parsedLrc])
    
    // 滚动到的歌词的 index
    const wheelEvent = (e: any) => {
        const scrollTop = lrcWrapEl!.scrollTop
        let idx = +((scrollTop + itemHeight / 2) / itemHeight).toFixed(0)
        if (idx >= parsedLrc.length) {
            idx = parsedLrc.length - 1
        }

        setScrollIdx(idx - 1)
    }

    // 右边的控制 前进/后退栏 的两个控制按钮
    const handleChangeOffset = (e: any) => {
        const newTimeOffset = timeOffset + e
        setTimeOffset(newTimeOffset)
        //  ?????
        Toast.success((newTimeOffset >= 0 ? '+' : '') + newTimeOffset + 's')
    }
    
    // 点击中间一条线的右边播放图标，跳转播放音乐！！
    const handleToTime = () => {
        const selectTime = parsedLrc[scrollIdx].time
        audioInstance.setCurrentTime(selectTime)
        audioInstance.play()
    }
    return (
        //整个歌词的容器
        <div
            onMouseEnter={() => setStopScroll(true)}
            onMouseLeave={() => setStopScroll(false)}
            className={`${style.lrcContainer} ${mode === 'white' ? style.white : style.black}`}
        >
            {/* 右侧控制部分是否要显示 */}
            {showControl ? (
                <div className={style.timeOffsetWrap}>
                    <div onClick={() => handleChangeOffset(-0.5)} className={style.lrcTimeUp}>
                        <UpOutlined />
                    </div>
                    <div onClick={() => handleChangeOffset(0.5)} className={style.lrcTimeDown}>
                        <DownOutlined />
                    </div>
                </div>
            ) : (
                ''
            )}
            {showControl ? (
                <div className={`${style.centerLine} ${stopScroll ? style.lineShow : ''}`}>
                    <div className={style.leftLine}>
                        <div className={style.leftTime}>{parseSecondToTime(parsedLrc?.[scrollIdx]?.time)}</div>
                    </div>
                    <div className={style.rightLine}>
                        <div className={style.rightPlay}>
                            <IconFont
                                className={`${style.playIcon} ${style.icon}`}
                                onClick={() => handleToTime()}
                                type={'icon-play'}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

             
            {/* 歌词部分的容器 */}
            <LrcWrap
                height={height}
                id={'lrcWrap' + _uid}
                className={style.lrcWrap}
                onScroll={wheelEvent}
            >
                <LrcContent padding={height / 2} className={style.lrcContent}>

                    {parsedLrc.map((item, idx) => {
                        return (
                            // 每句歌词的具体内容
                            <div
                                key={idx}
                                style={{
                                    ...(itemHeight ? { height: itemHeight + 'px' } : {}),
                                    ...(itemFontSize ? { fontSize: itemFontSize + 'px' } : {}),
                                    ...(idx === curLrcIdx && itemFontSize
                                        ? { fontSize: itemFontSize + 10 + 'px' }
                                        : {})
                                }}
                                className={`${idx === curLrcIdx ? style.lrcActive : ''} ${style.lrcItem} line1`}
                            >
                                {item.lrc}
                            </div>
                        )
                    })}
                </LrcContent>
            </LrcWrap>
        </div>
    )
}

export default Lyric

const LrcWrap = styled.div<{ height: number }>`
  height: ${(props) => props.height + 'px'};
`
const LrcContent = styled.div<{ padding: number }>`
  padding: ${(props) => props.padding + 'px'} 0;
`
