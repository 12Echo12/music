import { FC } from "react";
import style from './index.module.css'

import SongSheetItem from '../../component/songSheetItem'
import SongSheetDetailCard from "../../component/SongSheetDetaiCard";

import { useTopList } from '../../../hooks/useTopList'

interface RankProps { }

const Rank: FC<RankProps> = () => {

    const [topList, isLoading, detailTopList] = useTopList()

    return (
        <div className={`container1000`}>
            {/* 官方榜 */}
            <div className={style.official}>
                <div className={style.headerTitle}>官方榜</div>
                {/* 官方榜下的分类榜 */}
                <div className={style.rankListWrap}>
                    {detailTopList.map((item: any) => {
                        return <SongSheetDetailCard key={item.id} songSheetBaseInfo={item} />
                    })}
                </div>
            </div>
            {/* 全球榜 */}
            <div>
                <div className={style.headerTitle}>全球榜</div>
                <div className={style.sheetWrap}>
                    {topList?.slice(4).map((item) => (
                        <SongSheetItem songSheetInfo={item} key={item?.id} />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Rank