import React, { FC, useCallback, useEffect, useState } from 'react'
import LazyLoad from '../../components/lazyLoad'
import Loading from '../../components/Loading'
import PlayListPreviewCard from '../../components/playListPreviewCard'
import { getPlaylistDetail } from '../../service/api/music'
import { SongSheetType } from '../../type/songSheet'

interface PlayListProviderProps {
    playList: any
}

const PlayListProvider: FC<PlayListProviderProps> = (props) => {
    const { playList } = props
    const [playListDetail, setPlayListDetail] = useState<SongSheetType>()
    const [loading, setLoading] = useState(false)

    const fetchData = useCallback(() => {
        setLoading(true)
        const { id } = playList
        getPlaylistDetail(id)
            .then((res) => {
                setPlayListDetail(res.playlist)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [playList])

    return (
        <>
            {
                <LazyLoad onIntersecting={fetchData}>
                    <PlayListPreviewCard
                        title={playList?.name}
                        songs={playListDetail?.tracks || []}
                        pic={playList?.coverImgUrl}
                        type='playList'
                        id={playList.id}
                        loading={loading}
                    />
                </LazyLoad>
            }
        </>
    )
    // return <div>1</div>
}

export default PlayListProvider