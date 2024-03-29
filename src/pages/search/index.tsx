import { FC, useLayoutEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";


import TabBar from "../component/tabBar";
import TabBarItem from "../component/tabBarItem";
import AlbumTabPage from './albumTabPage'
import ArtistTabPage from './artistTabPage'
import PlayListTabPage from './playListTabPage'
import SongTabPage from './songTabPage'
import UserTabPage from './userTabPage'

import style from './index.module.css'

import { getSearchResult, SEARCH_TYPE } from '../../service/api/search'
import { useSearch } from '../../hooks/useSearch'

interface SearchProps { }

const Search: FC<SearchProps> = () => {

    const { keyword } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const [type, setType] = useState<SEARCH_TYPE>(SEARCH_TYPE.SONGS)

    const { searchResult, setCurPage, loading } = useSearch(type)
   
    const [tabList, setTabList] = useState([
        {
            title: '单曲',
            id: SEARCH_TYPE.SONGS
        },
        {
            title: '歌手',
            id: SEARCH_TYPE.ARTISTS
        },
        {
            title: '专辑',
            id: SEARCH_TYPE.ALBUMS
        },
        {
            title: '歌单',
            id: SEARCH_TYPE.PLAYLISTS
        },
        {
            title: '用户',
            id: SEARCH_TYPE.USERPROFILES
        }
    ])

    useLayoutEffect(() => {
        setType(+(searchParams.get('type') || SEARCH_TYPE.SONGS))
    }, [searchParams])
    
    // 根据 type 返回一些要展示的数据
    const parseType = useMemo(() => {
        const parseType = SEARCH_TYPE[type].toLowerCase()
        let parseName = ''
        switch (parseType) {
            case 'songs':
                parseName = '首歌曲'
                break
            case 'artists':
                parseName = '位歌手'
                break
            case 'albums':
                parseName = '张专辑'
                break
            case 'playlists':
                parseName = '张歌单'
                break
            case 'userprofiles':
                parseName = '位用户'
                break
        }
        console.log(parseName)

        // 返回对应中文类型
        return { parseType, parseName }
    }, [type])

    const handleChangeTab = (id: SEARCH_TYPE) => {
        setSearchParams('type=' + id.toString())
        setType(id)
    }

    return (
        <div className={style.searchWrap}>
            <div className={style.searchKeyword}>搜索 “{keyword}”</div>
            <div className={style.searchTabBar}>
                <TabBar activeIndex={type}>
                    {tabList.map((item, index) => {
                        return (
                            <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
                                {item.title}
                            </TabBarItem>
                        )
                    })}
                </TabBar>
                <div>
                    找到
                    <span className={style.tabRightCount}>
                        {searchResult?.[parseType.parseType]?.totalCount || 0}
                    </span>
                    {parseType?.parseName}
                </div>
            </div>

            {loading ? (
                <div>loading</div>
            ) : (
                <div>
                    {type === SEARCH_TYPE.SONGS && (
                        <SongTabPage setCurPage={setCurPage} data={searchResult?.songs}></SongTabPage>
                    )}
                    {type === SEARCH_TYPE.ARTISTS && (
                        <ArtistTabPage setCurPage={setCurPage} data={searchResult?.artists}></ArtistTabPage>
                    )}
                    {type === SEARCH_TYPE.PLAYLISTS && (
                        <PlayListTabPage
                            setCurPage={setCurPage}
                            data={searchResult?.playlists}
                        ></PlayListTabPage>
                    )}
                    {type === SEARCH_TYPE.ALBUMS && (
                        <AlbumTabPage setCurPage={setCurPage} data={searchResult?.albums}></AlbumTabPage>
                    )}
                    {type === SEARCH_TYPE.USERPROFILES && (
                        <UserTabPage setCurPage={setCurPage} data={searchResult?.userprofiles}></UserTabPage>
                    )}
                </div>
            )}
        </div>
    )
}

export default Search