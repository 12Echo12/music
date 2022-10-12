import { CheckOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { modes } from "react-transition-group/SwitchTransition";
import styled from "styled-components";
import ChangPian from "../../../components/ChangPian";
import Lyric from "../../../components/lyric";
import { RootState } from "../../../redux/store";
import MusicBar from "../MusicBar";
import style from './index.module.css'





interface FullScreenProps{ }

// 枚举类型
enum Mode{
    default, // 标准默认模式
    lyric,   // 歌词模式
    cover    // 封面模式
}

const FullScreen: FC<FullScreenProps> = () => {

    const currentTime = useSelector((state:RootState) => state.musicControl.currentTime)
    const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
    const { song, lyric } = useSelector((state: RootState) => state.musicControl.musicInfo)
    const [mode, setMode] = useState<Mode>(Mode.default)

    //???
    const [parsedLrc, setParseLrc] = useState<any[]>([])


    return (
        <div className="fullScreen">
            {/* 背景！！ */}
            <FullScreenWrap bg={song?.al?.picUrl}></FullScreenWrap>
            {/* 右侧选择栏 */}
            <div className={style.changeMode}>
                {/* 标准模式 */}
                <div onClick={() => { setMode(Mode.default) }}
                    className={`${style.modeItem} ${mode === Mode.default ? style.modeActive : ''}`}
                >
                    标准模式
                    {mode === Mode.default && <CheckOutlined />}
                    
                </div>
                {/* 歌词模式 */}
                <div
                    onClick={() => setMode(Mode.lyric)}
                    className={`${style.modeItem} ${mode === Mode.lyric ? style.modeActive : ''}`}
                >
                    歌词模式
                    {mode === Mode.lyric && <CheckOutlined />}
                </div>
                {/* 封面模式 */}
                <div
                    onClick={() => setMode(Mode.cover)}
                    className={`${style.modeItem} ${mode === Mode.cover ? style.modeActive : ''}`}
                >
                    封面模式
                    {mode === Mode.cover && <CheckOutlined />}
                </div>
            </div>
            {/* 唱片的展示 */}
            <div className={style.cover}>
                {mode === Mode.lyric ? (
                    <></>
                ) : (
                    <div
                        style={mode === Mode.cover ? { transform: 'scale(1.3)' } : {}}
                        className={`${style.songPicWrap} `}
                    >
                        <ChangPian isPlaying={isPlaying} songPicUrl={song?.al?.picUrl} />
                    </div>
                )}
            </div>

            {/* 歌词部分的展示 */}
            <>
                {mode === Mode.cover ? (
                    <></>
                ) : (
                    <div className={style.lyric}>
                        <div className={style.songName}>{song.name}</div>
                        <Lyric
                            height={mode === Mode.lyric ? 500 : 200}
                            itemFontSize={22}
                            itemHeight={40}
                            showControl={false}
                            mode='white'
                            lrc={parsedLrc}
                            currentTime={currentTime}
                            _uid='fullScreenPage'
                        />
                    </div>
                )}
            </>
            {/* 底部播放器部分 */}
            <div>
                <MusicBar id='fullScreen' mode='white' showBorder={false} />
            </div>
        </div>
    )
}


export default FullScreen

const FullScreenWrap = styled.div<{ bg: string }>`
  background-image: ${(props) => `url(${props.bg})`};
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.2);
  filter: blur(80px) brightness(0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`