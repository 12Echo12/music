import { ArrowsAltOutlined, LoadingOutlined, ShrinkOutlined } from "@ant-design/icons";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconFont } from "../../assets/css/iconFont";
import { parseSecondToTime } from "../../utils";
import { CSSTransition } from 'react-transition-group'

import ProgressBar from "../ProgressBar";

import { useClick } from "../../hooks/useClick";
import { useVideo } from './useVideo'

import styled from 'styled-components'
import style from './index.module.css'

// 全屏处理？？？？
import { enterFullScreen, exitFullScreen, isFullScreen } from '../../utils/fullScreen'

import { useFullScreen } from '../../hooks/useFullScreen'




interface VideoPlayerProps {
    width?: number
    height?: number
    src?: string
    urls?: {
        url: string
        type: string
        id: string
        br: string
    }[]
    defaultId?: string | number
    poster?: string
    controls?: boolean
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    playsinline?: boolean
    preload?: 'auto' | 'metadata' | 'none'
    onCanPlay?: () => void
    onCanPlayThrough?: () => void
    onEnded?: () => void
    onError?: () => void
    onPause?: () => void
    onPlay?: () => void
    onPlaying?: () => void
    onSeeked?: () => void
    onSeeking?: () => void
    onStalled?: () => void
    onWaiting?: () => void
}



const VideoPlayer: FC<VideoPlayerProps> = (props) => {

    const {
        width = '100%',
        height = '100%',
        src,
        urls,
        defaultId,
        poster,
        controls = true,
        autoplay = false,
        loop = false,
        muted = false,
        playsinline = true,
        preload = 'auto',
        onCanPlay,
        onCanPlayThrough,
        onEnded,
        onError,
        onPause,
        onPlay,
        onPlaying,
        onSeeked,
        onSeeking,
        onStalled,
        onWaiting
    } = props

    // hooks 获得视频相关状态！！！
    const [
        videoEl,
        {
            percent,
            currentTime,
            duration,
            isPlaying,
            isAdjust,
            bufferProgress,
            onChangePercent,
            handleTogglePlay,
            loading,
            handleSetVolume,
            handleToggleMute,
            ismuted,
            volume
        }
    ] = useVideo()


    // 清晰度！！！！
    const [videoBrs, setVideoBrs] = useState(urls)
    const [activeBr, setActiveBr] = useState<any>()

    // 清晰度处理   在组件渲染前执行！！！！
    useLayoutEffect(() => {
        if (videoEl.current) {
            videoEl.current.src = activeBr.url
            onChangePercent(percent)
        }
    }, [activeBr])

    // 全屏处理 ？？？？
    const handleFullScreen = () => {
        if (isFullScreen()) {
            exitFullScreen()
        } else {
            enterFullScreen(videoPlayEl.current)
        }
    }

    // 点击的 hooks 单击暂停 双击全屏
    const [handleClick, fullScreen] = useClick(
        { clickFn: handleTogglePlay, doubleFn: handleFullScreen },
        300
    )

    // 按空格键可暂停视频
    const keyDown = (e: any) => {
        if (e.keyCode === 32) {
            e.preventDefault()
            handleClick()
        }
    }

    // 1 . 用 useRef()获取页面元素
    const videoPlayEl = useRef<HTMLElement | null>(null)


    useEffect(() => {
        // 2 . 用 ref 身上的 current 来获取元素
        videoPlayEl.current = document.getElementById('videoPlayer')
        if (videoPlayEl.current) {
            document.addEventListener('keydown', keyDown)
        }
        return () => {
            document.removeEventListener('keydown', keyDown)
        }
    }, [handleTogglePlay])


    const [isFull] = useFullScreen()

    return (
        <VideoPlayerWrapper
            id='videoPlayer'
            className={style.videoWrapper}
            width={width}
            height={height}
        >
            <div className={style.video}>
                <video
                    autoPlay={autoplay}
                    onClick={handleClick}
                    onDoubleClick={fullScreen}
                    id='videoPlay'
                ></video>
            </div>
            <div className={style.layerIcon}>
                <CSSTransition in={loading} unmountOnExit timeout={500} classNames='fade'>
                    <LoadingOutlined />
                </CSSTransition>
            </div>
            <div className={style.videoControl}>
                <div className={style.controlTop}>
                    <ProgressBar
                        onChangeStart={() => {
                            isAdjust.current = true
                        }}
                        onChangeEnd={() => {
                            isAdjust.current = false
                        }}
                        percent={percent}
                        underPercent={bufferProgress}
                        setPercent={(number) => onChangePercent(number)}
                    />
                </div>
                <div className={style.controlBottom}>
                    <div className={style.left}>
                        <div>
                            <IconFont
                                className={`${style.playIcon} ${style.icon}`}
                                onClick={handleTogglePlay}
                                type={isPlaying ? 'icon-pause' : 'icon-play'}
                            />
                        </div>
                        <div className={style.time}>
                            <span>{parseSecondToTime(currentTime)}</span> /{' '}
                            <span>{parseSecondToTime(duration)}</span>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.volume}>
                            <IconFont
                                onClick={() => handleToggleMute()}
                                className={style.icon}
                                type={`${ismuted ? 'icon-sound-off' : 'icon-sound-on'}`}
                            />
                            <div className={style.volumeBar}>
                                <ProgressBar
                                    percent={ismuted ? 0 : volume}
                                    setPercent={(number) => handleSetVolume(number)}
                                />
                            </div>
                        </div>
                        {/* 清晰度选择 */}
                        <div className={style.selectBr}>
                            <div className={style.selectBrTitle}>
                                <span>{activeBr?.type}</span>
                            </div>
                            <div className={style.selectList}>
                                {videoBrs?.map((item) => (
                                    <span
                                        key={item.id}
                                        className={`${style.selectItem} ${item.id == activeBr?.id ? style.activeBr : ''
                                            }`}
                                        onClick={() => {
                                            setActiveBr(item)
                                        }}
                                    >
                                        {item.type}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div onClick={fullScreen} className={style.fullscreen}>
                            {isFull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                        </div>
                    </div>
                </div>
            </div>
        </VideoPlayerWrapper>
    )
}


export default VideoPlayer


const VideoPlayerWrapper = styled.div<{
    width: number | string
    height: number | string
}>`
  width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
  height: ${(props) => (typeof props.height === 'number' ? `${props.height}px` : props.height)};
`