import {
    DownloadOutlined,
    DownOutlined,
    HeartOutlined,
    ShareAltOutlined,
    StarOutlined,
    UpOutlined
} from '@ant-design/icons'

import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { IconFont } from '../../../../assets/css/iconFont'
import { publicSlice } from '../../../../redux/publicSlice/slice'
import store, { RootState } from '../../../../redux/store'
// 后端接口？？
import { downLoadMusic } from '../../../../service/api/music'
// 后端接口？？？
import { handleToggleLike } from '../../../../service/utils'
import style from './index.module.css'

import Like from '../../../../components/Like/index'
import { useIsLiked } from '../../../../hooks/useLikeList'


interface MusicBarLeftProps { }

const MusicBarLeft: FC<MusicBarLeftProps> = () => {
    // toggle 切换键
    const toggleChange = () => {
        store.dispatch(publicSlice.actions.setSongDetailOpen(!songDetailOpen))
    }

    // useSelector() 从全局 store 中获取相关数据
    const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
    const songInfo = useSelector((state: RootState) => state.musicControl.musicInfo.song)

    const isLiked = useIsLiked()
    return (
        <div>
            {songInfo.name && (
                <div
                    style={{
                        transform: `${songDetailOpen ? 'translateY(-100%)' : 'translateY(0)'}`
                    }}
                    className={style.musicBarLeft}
                >
                    {/* 默认显示歌曲信息 */}
                    <div className={style.musicInfo}>
                        <div onClick={toggleChange} className={style.musicPic}>
                            <img src={songInfo?.al?.picUrl} alt='' />
                            <UpOutlined className={style.musicPicHover} />
                        </div>
                        <div className={style.songInfo}>
                            <div className={`line1 ${style.songInfoNameWrap}`}>
                                <div className={`line1 ${style.songInfoName}`}>{songInfo.name + ' '}</div>
                                <div className={style.songInfoHandle}>
                                    <Like id={songInfo.id} />
                                </div>
                            </div>
                            <div>
                                <span className={`line1 ${style.songInfoAr}`}>
                                    {songInfo?.ar?.map((item: any) => item.name).join('/')}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* 点击后显示下面信息 */}
                    <div className={style.musicDetailCut}>
                        <div onClick={toggleChange} className={style.upBtn}>
                            <DownOutlined />
                        </div>
                        <div className={style.musicDetailCutIcons}>
                            <div className={style.musicDetailCutIconItem}>
                                <Like id={songInfo.id} />
                            </div>
                            <div className={style.musicDetailCutIconItem}>
                                <StarOutlined />
                            </div>
                            <div
                                onClick={() => {
                                    downLoadMusic(songInfo.id, songInfo.name)
                                }}
                                className={style.musicDetailCutIconItem}
                            >
                                <DownloadOutlined />
                            </div>
                            <div className={style.musicDetailCutIconItem}>
                                <ShareAltOutlined />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MusicBarLeft