import { FC, useEffect, useState } from "react";
import style from './index.module.css'
import Swiper from "../../../components/swiper/Swiper";
import SwiperItem from "../../../components/swiper/SwiperItem";
import SongSheetItem from "../../component/songSheetItem";
import LinkTab from "../../component/linkTab";

import { AddMusic } from "../../../controller/musicController";
import { getBanner } from '../../../service/api/home'
import { getDailyRecommend } from '../../../service/api/reLoginApi/songSheets'
import { getPersonalizedSongSheets } from '../../../service/api/music'

import { SongSheetsType } from '../../../service/api/type'

import store from '../../../redux/store'

interface SuggestProps { }

const Suggest: FC<SuggestProps> = () => {

    // 海报轮播图 和 歌单推荐
    const [songSheets, setSongSheets] = useState<SongSheetsType[]>([])
    const [banners, setBanners] = useState<any[]>([])

    useEffect(() => {
        // 后端接口 ：来获得每日歌单推荐！！！
        getDailyRecommend().then((res) => {
            setSongSheets(res.result)
        })
        // 后端接口：来获得每日轮播图推荐！！！
        getBanner().then((res) => {
            setBanners(res.banners)
        })
    }, [])

    // 点一下轮播图，开始放歌
    const handleBannerClick = (item: any) => {
        console.log(item)
        switch (item.targetType) {
            case 1:
                AddMusic(item.song)
                break
        }
    }
    return (
        <div className={style.suggest}>
            {/* 轮播图！！！！ */}
            <Swiper>
                {/* banner 海报！！！ */}
                {/* o 是 item ，i 是 index */}
                {banners.map((o, i) => {
                    return (
                        <SwiperItem key={i} index={i}>
                            <div style={{ cursor: 'pointer' }} onClick={() => handleBannerClick(o)}>
                                <img src={o.pic} alt='' />
                            </div>
                        </SwiperItem>
                    )
                })}
            </Swiper>
            {/* 跳转组件 */}
            <LinkTab title='推荐歌单' to='/' />
            {/* 歌单展示 */}
            <div className={`sheetWrap`}>
                {songSheets.map((item) => {
                    return (<SongSheetItem songSheetInfo={item} key={item.id} />);
                })}
            </div>
        </div>
    )
}

export default Suggest