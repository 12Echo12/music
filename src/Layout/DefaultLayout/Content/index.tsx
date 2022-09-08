import { FunctionComponent, useEffect, useState } from 'react'
import style from './Content.module.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { linkItems, LinkItemTypes } from './config'
import { useSelector } from 'react-redux'
import { HeartOutlined } from '@ant-design/icons'
import { IconFont } from '../../../assets/css/iconFont'
import SideBar from '../../../components/SideBar'
import SideBarGroup from '../../../components/SideBar/SideBarGroup'
import SideBarItem from '../../../components/SideBar/SideBarItem'
import PlayList from '../../../components/PlayList/index'


interface ContentProps {
    hiddenSideBar?: boolean
}

const Content: FC<ContentProps> = (props) => {
    const [sideBarItems, setSideBarItems] = useState<LinkItemTypes[]>([])
    const userPlayList = useSelector((state: any) => state.user.userPlayList)
    const userLikeList = useSelector((state: any) => state.user.userLikeList)
    const curSideOpen = useSelector((state: any) => state.public.curSideOpen)
    const { hiddenSideBar } = props
    useEffect(() => {
        const _sideBarItems: LinkItemTypes[] = []
        _sideBarItems.push(...linkItems)
        if (userPlayList.length) {
            _sideBarItems.push({
                name: '我的歌单',
                children: userPlayList.map((item: any, idx: number) => {
                    return {
                        id: item.id,
                        name: item.name,
                        href: `/songSheet/${item.id}`,
                        icon: idx === 0 ? <HeartOutlined /> : <IconFont type={`icon-playlist`} />
                    }
                })
            })
        }
        if (userLikeList.length) {
            _sideBarItems.push({
                name: '我的收藏',
                children: userLikeList.map((item: any) => {
                    return {
                        id: item.id,
                        name: item.name,
                        href: `/songSheet/${item.id}`,
                        icon: <IconFont type={`icon-playlist`} />
                    }
                })
            })
        }
        setSideBarItems(_sideBarItems)
    }, [userPlayList, userLikeList])
    return (
        <div className={style.content}>
            {hiddenSideBar ? null : (
                <div className={style.siderBar}>
                    <SideBar route>
                        {sideBarItems.map((item, index) => {
                            return item.children ? (
                                <SideBarGroup title={item.name} key={index}>
                                    {item?.children.map((item, index) => {
                                        return (
                                            <SideBarItem
                                                icon={item.icon || null}
                                                key={item.href}
                                                name={item.name}
                                                href={item.href}
                                                regPath={item.regPath}
                                            />
                                        )
                                    })}
                                </SideBarGroup>
                            ) : (
                                <SideBarItem key={item.href} name={item.name} href={item.href} id={item.id} />
                            )
                        })}
                    </SideBar>
                </div>
            )}{hiddenSideBar ? null : (
        <div className={style.siderBar}>
          <SideBar route>
            {sideBarItems.map((item, index) => {
              return item.children ? (
                <SideBarGroup title={item.name} key={index}>
                  {item?.children.map((item, index) => {
                    return (
                      <SideBarItem
                        icon={item.icon || null}
                        key={item.href}
                        name={item.name}
                        href={item.href}
                        regPath={item.regPath}
                      />
                    )
                  })}
                </SideBarGroup>
              ) : (
                <SideBarItem key={item.href} name={item.name} href={item.href} id={item.id} />
              )
            })}
          </SideBar>
        </div>
      )}{hiddenSideBar ? null : (
        <div className={style.siderBar}>
          <SideBar route>
            {sideBarItems.map((item, index) => {
              return item.children ? (
                <SideBarGroup title={item.name} key={index}>
                  {item?.children.map((item, index) => {
                    return (
                      <SideBarItem
                        icon={item.icon || null}
                        key={item.href}
                        name={item.name}
                        href={item.href}
                        regPath={item.regPath}
                      />
                    )
                  })}
                </SideBarGroup>
              ) : (
                <SideBarItem key={item.href} name={item.name} href={item.href} id={item.id} />
              )
            })}
          </SideBar>
        </div>
            )}{hiddenSideBar ? null : (
                <div className={style.siderBar}>
                    <SideBar route>
                        {sideBarItems.map((item, index) => {
                            return item.children ? (
                                <SideBarGroup title={item.name} key={index}>
                                    {item?.children.map((item, index) => {
                                        return (
                                            <SideBarItem
                                                icon={item.icon || null}
                                                key={item.href}
                                                name={item.name}
                                                href={item.href}
                                                regPath={item.regPath}
                                            />
                                        )
                                    })}
                                </SideBarGroup>
                            ) : (
                                <SideBarItem key={item.href} name={item.name} href={item.href} id={item.id} />
                            )
                        })}
                    </SideBar>
                </div>
            )}
            <div id='mainContent' className={style.mainPage}>
                <Outlet />
            </div>
            <div id='rightSideBar' className={style.rightSideContent}>
                {/* 右侧显示的内容：消息列表和播放列表 */}
                {curSideOpen === 'playList' && <PlayList />}
            </div>
       </div>
        
    )
}
export default Content