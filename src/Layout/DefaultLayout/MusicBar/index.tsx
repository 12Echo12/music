import { FC } from "react";

import style from './index.module.css'
// 音乐控制组件
import MusicControl from '../../../components/musicControl/MusicControl'
import VolumeControl from '../../../components/VolumeControl/VolumeControl'
import MusicBarLeft from './MusicBarLeft/index'

import store, { RootState } from '../../../redux/store'
import { useSelector } from '../../../redux/hooks'
import audioInstance from '../../../controller/musicPlayer'
import { publicSlice } from '../../../redux/publicSlice/slice'
import { connect } from 'react-redux'
import { createFromIconfontCN } from "@ant-design/icons";
import { IconFont } from "../../../assets/css/iconFont";

interface MusicBarProps {
    mode?: 'white' | 'dark'
    showBorder?: boolean
    id?: string
}

const MusicBar: FC<MusicBarProps> = ({ showBorder = true, mode = 'dark', id }) => {
    // 是否静音
    const isMute = useSelector((state: RootState) => state.musicControl.isMute)
    // 音量开关
    const toggleVolume = () => {
        audioInstance.toggleVolume()
    }
    // 从全局状态中获取 歌曲具体信息是否展示的状态
    const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)

    // 具体信息是否展示
    const toggleChange = () => {
        store.dispatch(publicSlice.actions.setSongDetailOpen(!songDetailOpen))
    }

    // 播放列表是否展示
    const handleOpenList = () => {
        store.dispatch(publicSlice.actions.setCurSideOpen('playList'))
    }

    return (
        <div
            id='musicBar'
            style={showBorder ? {} : { border: 'none' }}
            className={`${style.musicBar} ${mode === 'white' ? style.white : ''}`}
        >
            <div className={style.musicInfo}>
                {/* 左边歌曲转圈部分 */}
                <MusicBarLeft />
            </div>
            <div className={style.play}>
                {/* 中间歌曲控制组件 */}
                <MusicControl />
            </div>
            <div className={style.other}>
                <div className={style.volume}>
                    {/* 调节音量的字体图标 */}
                    <IconFont
                        onClick={toggleVolume}
                        className={style.icon}
                        type={`${isMute ? 'icon-sound-off' : 'icon-sound-on'}`}
                    />
                    <div className={style.volumeControl}>
                        {/* 鼠标经过音量图标后，显示的音量调整 */}
                        <VolumeControl id={id} />
                    </div>
                </div>
                {/* 右边播放列表的字体图标 */}
                <IconFont onClick={handleOpenList} className={style.icon} type={`icon-playlist`} />
            </div>
        </div>
    )
}

export default MusicBar;