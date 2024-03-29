import { PlayCircleOutlined } from "@ant-design/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import LazyImg from "../../../components/LazyImg";
import playListImg from '../../../assets/img/playListImg.png'
import highSheetImg from '../../../assets/img/highSheet.png'

import style from './index.module.css'
import { formatNumber } from "../../../utils";
import { HighQualitySongSheetType } from "../../../type/highQualitySongSheet";




interface HighQualitySongSheetItemProps {
    songSheetInfo: HighQualitySongSheetType
}

const HighQualitySongSheetItem: FC<HighQualitySongSheetItemProps> = (props) => {

    const { songSheetInfo } = props

    const navigate = useNavigate()
    const handleToSongSheet = () => {
        navigate(`/songSheet/${songSheetInfo.id}`)
    }
    
    return (
        <div onClick={handleToSongSheet} className={style.sheetWrap}>
            {/* 封面部分 */}
            <div className={style.imgWrap}>
                <img src={highSheetImg} className={style.highSheetImg} alt='' />
                <LazyImg
                    src={
                        ((songSheetInfo.coverImgUrl || songSheetInfo.coverImgUrl) ?? playListImg) +
                        '?param=300y300'
                    }
                />
                {/* 图片上的东西 */}
                <div className={style.content}>
                    <div className={style.playCount}>
                        <PlayCircleOutlined className={style.playIcon} />
                        {formatNumber(songSheetInfo.playCount || songSheetInfo.playCount || 0)}
                    </div>
                    <div className={style.hoverWrap}>
                        <PlayCircleOutlined className={style.playIcon} />
                    </div>
                </div>
            </div>
            <div className={style.sheetContent}>
                <div className={`${style.sheetName} line1`}>{songSheetInfo.name}</div>
                <div className={style.creator}>by {songSheetInfo.creator.nickname}</div>
                <div className={`${style.copywriter} line1`}>{songSheetInfo.copywriter}</div>
            </div>
        </div>
    )
}

export default HighQualitySongSheetItem