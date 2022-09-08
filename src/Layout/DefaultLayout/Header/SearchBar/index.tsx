// 搜索框

import { RightOutlined, SearchOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './SearchBar.module.css'
import { CSSTransition } from 'react-transition-group'
import { getHotSearch, getSearchSuggest, SEARCH_TYPE } from '../../../../service/api/search'
import { SearchSuggestType, useSearchSuggest } from '../../../../hooks/useSearchSuggest'
import store from '../../../../redux/store'
import { publicSlice } from '../../../../redux/publicSlice/slice'
// ?????
import { addMusic, getSongBaseInfoAndSet } from '../../../../controller/listController'

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = () => {
    const { keyword } = useParams()
    // 是否显示下拉菜单框
    const [showTip, setShowTip] = useState(false)
    const [hotSearch, setHotSearch] = useState([])
    // 搜索框输入的内容
    const [searchInput, setSearchInput] = useState(keyword || '')
    // 根据输入内容进行推荐的内容
    const [searchSuggest, handleSearchSuggest, suggestLoading] = useSearchSuggest()
    // 获取搜索历史
    const searchHistory = store.getState().public.searchHistory.slice(0, 6)
    const navigate = useNavigate()
    

    // 如果搜索框有内容就展示跟搜索内容相关的数据，如果没有就展示热搜数据
    const handleGetHotSearch = () => {
        setShowTip(true)
        getHotSearch().then((res) => {
            setHotSearch(res.data)
        })
        searchInput && handleSearchSuggest(searchInput)
    }
    
    // 点击回车后，触发的搜索事件
    const handleSearch = (searchText?: string, key = 'songs') => {
        if (searchText === undefined && searchInput === '') {
            return
        }
        store.dispatch(publicSlice.actions.setSearchHistory(searchText || searchInput))
        setShowTip(false)
        key = key && (SEARCH_TYPE as any)[key?.toUpperCase()]
        navigate(`/search/${searchText || searchInput}?type=${key}`)
    }
    
    // 键盘输入内容后触发的事件
    const handleInputChange = (e: any) => {
        setSearchInput(e.target.value)
        handleSearchSuggest(e.target.value)
    }

    // 点击热搜推荐后触发的事件
    const clickHot = (item: any) => {
        // 将输入框的内容变成点击的内容（补充完整）
        setSearchInput(item)
        handleSearch(item)
    }

    const handleSuggestClick = (item: any, type: keyof typeof SearchSuggestType) => {
        switch (type) {
            case 'songs':
                // ??????
                getSongBaseInfoAndSet(item.id)
                break
            case 'playlists':
                navigate(`/songSheet/${item.id}`)
                break
            case 'artists':
                navigate(`/artist/${item.id}`)
                break
            case 'albums':
                navigate(`/album/${item.id}`)
        }
    }
    return (
        // 搜索框 、设置搜索下拉菜单是否显示，以及按回车进行搜索
        <div
            onBlur={() => {
                setShowTip(false)
            }}
            onFocus={() => {
                handleGetHotSearch()
            }}
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    handleSearch()
                }
            }}
            className={style.navSearch}
        >
            <SearchOutlined onClick={() => handleSearch()} className={style.searchIcon} />
            <input value={searchInput} onInput={handleInputChange} type='text' />
            <CSSTransition in={showTip} timeout={300} classNames='showTip' unmountOnExit>
                <div className={style.searchInfoTipWrap}>

                // 如果搜索框是空白的情况下，下拉菜单要默认显示的内容

                    {searchInput === '' || searchSuggest?.order.length === 0 ? (
                        <>
                            <div className={style.history}>
                                // 搜索历史显示内容
                                {searchHistory.length !== 0 && (
                                    <>
                                        <div className={style.historyTitle}>搜索历史</div>
                                        {searchHistory.map((item) => {
                                            return (
                                                <div
                                                    key={item}
                                                    onClick={() => {
                                                        setSearchInput(item)
                                                        handleSearch(item)
                                                    }}
                                                    className={`${style.historyItem} line1`}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        })}
                                    </>
                                )}
                            </div>
                            <div className={style.hotSearch}>
                                <div className={style.hotSearchTitle}>热搜榜</div>
                                <div className={style.hotSearchList}>
                                    {hotSearch.map((item: any, index: number) => {
                                        return (
                                            <div
                                                onClick={() => clickHot(item.searchWord)}
                                                className={style.hotSearchItem}
                                                key={item.searchWord}
                                            >
                                                <div
                                                    className={`${style.hotItemIndex} ${index < 3 ? style['hotItemIndex' + index] : ''
                                                        }`}
                                                >
                                                    {index + 1}
                                                </div>
                                                <div className={style.hotItemInfo}>
                                                    <div className={style.hotItemKeyWord}>
                                                        <span
                                                            className={`${style.hotItemSearchWord} ${index < 3 ? style.hotSearchBold : ''
                                                                }`}
                                                        >
                                                            {item.searchWord}
                                                        </span>
                                                        <span className={style.hotItemScore}>{item.score}</span>
                                                    </div>
                                                    {item.content && (
                                                        <div className={`${style.hotItemContent} line1`}>
                                                            <span>{item.content}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
            // 输入框有内容下拉菜单要显示的数据内容
                        <>
                            <div>搜索“{searchInput}”相关的内容</div>

                            <div className={style.suggest}>
                                {searchSuggest?.order.map((key) => {
                                    return (
                                        <div key={key}>
                                            <div onClick={() => handleSearch('', key)} className={style.suggestType}>
                                                {SearchSuggestType[key]}
                                            </div>
                                            <div className={style.suggestContent}>
                                                {searchSuggest.data[key].map((item: any) => {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => handleSuggestClick(item, key)}
                                                            className={`${style.suggestItem} line1`}
                                                        >
                                                            {item.name}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>
            </CSSTransition>
        </div>
    )
}

export default SearchBar
                            
        