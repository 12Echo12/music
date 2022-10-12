import { PlayCircleOutlined } from "@ant-design/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { formatNumber } from '../../../utils'
import style from './index.module.css'
import playListImg from '../../../assets/img/playListImg.png'
import LazyImg from '../../../components/LazyImg'


import { SongSheetsType } from '../../../service/api/type'
import { ToplistType } from '../../../type/topListItem'



interface SongSheetItemProps {
    songSheetInfo: Partial<SongSheetsType & ToplistType>
}




const SongSheetItem: FC<SongSheetItemProps> = ({ songSheetInfo }) => {
    
    // 注册跳转路由
    const navigate = useNavigate()
    const handleToSongSheet = () => {
        navigate(`/songSheet/${songSheetInfo.id}`)
    }
    
    return (
        <div className={style.songSheetItem} onClick={handleToSongSheet}>
            <div className={style.contentWrap}>
                {/* 大图片 */}
                <LazyImg src={((songSheetInfo.picUrl || songSheetInfo.coverImgUrl) ?? playListImg) + '?param=300y300'} />
                <div className={style.content}>
                    {/* 右上角部分 */}
                    <div className={style.playCount}>
                        <PlayCircleOutlined className={style.playIcon} />
                        {formatNumber(songSheetInfo.playCount || songSheetInfo.playcount || 0)}
                    </div>
                    {/* 遮罩层部分 */}
                    <div className={style.hoverWrap}>
                        <PlayCircleOutlined className={style.playIcon} />
                    </div>
                </div>
            </div>
            {/* 底部 歌单简介部分！！！ */}
            <div className={`${style.songSheetName} line2`}>{songSheetInfo.name}</div>
        </div>
    )
}

export default SongSheetItem