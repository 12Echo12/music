import { FC, useCallback } from "react";
import style from './index.module.css'
import styled from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";

import Pagination from "../../../components/Pagination";
import SongSheetItem from "../../component/songSheetItem";
import TabBar from "../../component/tabBar";
import TabBarItem from "../../component/tabBarItem";

import { useGetSongSheet } from './hooks/useGetSongSheet'
import { useSongsheetsCategory } from './hooks/usePlayListHot'

interface SongSheetsProps {}

const SongSheets: FC<SongSheetsProps> = () => {

    const { highquality, playList, playListTotal, curPage, setCurPage } = useGetSongSheet()
    // 获得歌单
    const { songSheetsCategory } = useSongsheetsCategory()

    const { type } = useParams()
    const navigate = useNavigate()
    const handleToHighQualityPage = useCallback(() => {
        navigate(`/songSheets/highQuality/${type}`)
    }, [type])

    return (
        <div className={`${style.songSheetsWrap} container1000`}>
            {highquality && (
                //  头部
                <div onClick={handleToHighQualityPage} className={style.headerWrap}>
                    {/* 头部左边照片 */}
                    <div className={style.leftImg}>
                        <img src={highquality?.coverImgUrl + '?param=300y300'} alt='' />
                    </div>
                    {/* 头部右边介绍 */}
                    <div className={style.right}>
                        <div className={style.tag}>精品歌单</div>
                        <div className={style.title}>{highquality?.name}</div>
                        <div className={style.copywriter}>{highquality?.copywriter}</div>
                    </div>
                    <HeaderBgImg bgImg={highquality?.coverImgUrl}></HeaderBgImg>
                </div>
            )}
            {/* 歌单分类导航栏 */}
            <div className={style.category}>
                <div className={style.hotCategories}>
                    <TabBar route={true}>
                        {
                            songSheetsCategory.map((item, index) => {
                                return (
                                    <TabBarItem
                                        tabBarItemClassName={style.tabBarItem}
                                        tabBarItemActiveClassName={style.tabBarItemActive}
                                        key={index}
                                        path={'/songSheets/default/' + encodeURIComponent(item.name)}
                                    >
                                     {item.name}
                                    </TabBarItem>
                                )
                            })
                        }
                    </TabBar>
                </div>
            </div>
            {/* 每类歌单下的内容！！！ */}
            <div className={`sheetWrap`}>
                {playList.map((item) => (
                    <SongSheetItem songSheetInfo={item} key={item.id} />
                ))}
            </div>
            {/* 底部分页部分 */}
            <Pagination
                onChangeCurrentPage={setCurPage}
                total={Math.ceil(playListTotal / 20)}
                pageCurrent={curPage}
            />
        </div>
    )
}

export default SongSheets


const HeaderBgImg = styled.div<{ bgImg: string }>`
  position: absolute;
  background-image: ${(props) => `url(${props.bgImg})`};
  background-size: cover;
  background-position: center;
  filter: blur(40px) brightness(0.6);
  width: 100%;
  height: 100%;
  z-index: 0;
  left: 0;
`