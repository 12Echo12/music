import { LoadingOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect } from "react";
import { isScrollBottom } from "../../utils";


import style from './index.module.css'

import { HighQualitySongSheetType } from '../../type/highQualitySongSheet'

// 引入获得信息的 hooks
import { useGetHighSongSheet } from './hooks/useGetHighSongSheet'
import HighQualitySongSheetItem from "../component/highQualitySongSheetItem";

interface HighQualityProps { }

const HighQuality: FC<HighQualityProps> = () => {


    // 通过 hooks 获得有关信息！！！
    const { highQualityList, isLoading, hasMore, getMore } = useGetHighSongSheet()



    // 3. 滚动到底会触发的事件！！！
    const addPage = useCallback(() => {
        console.log('addPage')
        console.log(isLoading, hasMore)

        if (!isLoading && hasMore) {
            // 获得更多歌单信息！！！
            getMore()
        }
    }, [getMore, highQualityList])

    // 2.滚动会触发的事件！！！
    const scrollAddPage = useCallback(() => {
        const mainContent = document.querySelector('#mainContent')
        const isBottom = isScrollBottom(mainContent!)
        console.log(isBottom, isLoading)
        if (isBottom) {
            addPage()
        }
    }, [addPage])

    // 1. 给元素注册滚动监听事件
    useEffect(() => {
        const mainContent = document.querySelector('#mainContent')
        mainContent?.addEventListener('scroll', scrollAddPage)

        return () => {
            mainContent?.removeEventListener('scroll', scrollAddPage)
        }
    }, [scrollAddPage])

    return (
        <div>
            <div className={style.listWrap}>
                {highQualityList &&
                    highQualityList.map((item: HighQualitySongSheetType) => (
                        <HighQualitySongSheetItem key={item.id} songSheetInfo={item} />
                    ))}
            </div>
            {hasMore && (
                <div className={style.loading}>
                    {/* 缓冲的图标 */}
                    <LoadingOutlined />
                    加载中...
                </div>
            )}
        </div>
    )
}


export default HighQuality
