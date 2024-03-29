import { FC, useState } from 'react'
import style from './index.module.css'
import './transition.css'
import {
    BorderOutlined,
    CloseOutlined,
    LeftOutlined,
    MinusOutlined,
    RightOutlined,
    SearchOutlined
} from '@ant-design/icons'
import createLogin from '../../../components/login'

import { useSelector } from '../../../redux/hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconFont } from '../../../assets/css/iconFont'
import store, { RootState } from '../../../redux/store'
import { publicSlice } from '../../../redux/publicSlice/slice'
import { getHotSearch } from '../../../service/api/search'
import SearchBar from './SearchBar/index'

// electron

let electron: any
try {
    electron = window.require('electron')
} catch(error){}

const Header: FC = () => {

    // 获取状态 1 songDetailOpen ?
    const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
    
    // ?
    const handleLogin = () => {
        createLogin.create()
    }

    // 窗口的放大与缩小
    function closeWin() {
        electron.ipcRenderer.send('window-close')
    }
    function maximize() {
        electron.ipcRenderer.send('window-maximize')
    }
    function minimize() {
        electron.ipcRenderer.send('window-minimize')
    }
    
    // 获取状态 2
    const userInfo = useSelector((state) => state.user.userInfo)
    
    // navigate 浏览历史（页面前进or后退）
    const navigate = useNavigate()
    const handleNavigate = (direction: number) => {
        navigate(direction)
        store.dispatch(publicSlice.actions.setSongDetailOpen(false))
    }

    return (
        <div className={style.dragWrap}>
            <div className={style.header}>
                <div className={style.logoWraper}>
                    <Link to='/' className={style.logo}>
                        <IconFont className={style.icon} type={`icon-wangyiyunyinlelogo-copy`} />
                    </Link>
                </div>
                {/* 导航键and搜索框部分 */}
                <div className={`${style.left} ${songDetailOpen ? style.leftOpenStyle : ''}`}>
                    <div className={style.navBar}>
                        <div className={style.navBtn}>
                            <div onClick={() => handleNavigate(-1)} className={style.iconWrap}>
                                <LeftOutlined />
                            </div>
                            <div onClick={() => handleNavigate(1)} className={style.iconWrap}>
                                <RightOutlined />
                            </div>
                        </div>
                        <SearchBar />
                    </div>
                </div>
                {/* 登陆部分 */}
                <div className={style.right}>
                    {userInfo ? (
                        <Link className={style.loginItem} to='/user/me'>
                            <img className={style.avatar} src={userInfo.avatarUrl} alt='' />
                            <div>{userInfo.nickname}</div>
                        </Link>
                    ) : (
                        <div onClick={handleLogin} className={style.loginItem}>
                            未登录
                        </div>
                    )}
                    {electron?.ipcRenderer && (
                        <div className={style.eletronControlIcon}>
                            <div className={style.eletronControlIconItem} onClick={() => minimize()}>
                                <MinusOutlined />
                            </div>
                            <div className={style.eletronControlIconItem} onClick={() => maximize()}>
                                <BorderOutlined />
                            </div>
                            <div className={style.eletronControlIconItem} onClick={() => closeWin()}>
                                <CloseOutlined />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Header
