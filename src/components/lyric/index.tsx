import { FC, useEffect } from "react"

import style from './index.module.css'
import styled from 'styled-components'
import { IconFont } from '../../assets/css/iconFont'

import { parseLrc, parseSecondToTime } from '../../utils'
import { DownOutlined, UpOutlined } from "@ant-design/icons"

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

    // 歌曲播放的当前时间变化，就会重新去设置当前应该展示的歌词部分（即到哪一句歌词了）
    useEffect(() => {
        for (let i = 0; i < parsedLrc.length; i++) {
            if (currentTime + timeOffset < parsedLrc[i].time) {
                const curIdx = i - 1 >= 0 ? i - 1 : 0
                setCurLrcIdx(curIdx)

                //设置scroll
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
