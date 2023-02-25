import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import store from "../../redux/store";

import TabBar from "../component/tabBar";
import TabBarItem from "../component/tabBarItem";
import UserInfoHeader, { UserInfo } from "../component/userInfoHeader";
import Loading from "../../components/Loading";
import PlayListProvider from './PlayListProvider'

import { useUserDetail } from '../../hooks/useUserDetail'
import { useUserPlayList } from '../../hooks/useUserPlayList'

import style from './index.module.css'

interface UserDetailProps {
    me?: boolean
}

const UserDetail: FC<UserDetailProps> = ({me}) => {

    let iid = useParams().id
    // 该用户是否是用户自己！！！！
    const id = me ? store.getState().user?.userInfo?.userId : iid

    const [userDeatil, loading, error] = useUserDetail(id)
    const [userInfo, setUserInfo] = useState<UserInfo>()
    useEffect(() => {
        if (userDeatil) {
            setUserInfo({
                nikename: userDeatil.profile.nickname,
                avatarUrl: userDeatil.profile.avatarUrl,
                follows: userDeatil.profile.follows,
                eventCount: userDeatil.profile.eventCount,
                followeds: userDeatil.profile.followeds,
                signature: userDeatil.profile.signature,
                gender: userDeatil.profile.gender,
                level: userDeatil.level
            })
        }
    }, [userDeatil])


    // tab 列表
    const [tabList, setTabList] = useState([
        {
            title: '创建的歌单'
        },
        {
            title: '收藏的歌单'
        }
    ])
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (id: number) => {
        setActiveTab(id)
    }

    // 将相同的操作通过一个函数提取出来
    const [ownList, likeList, listLoading] = useUserPlayList(id)
    const [playListStyle, setPlayListStyle] = useState(0)

    if (!id)
        return null

    function playList(playList: any[]) {
        switch (playListStyle) {
            case 0:
                return (
                    <>
                        {playList.map((playListItem) => {
                            return (
                                <PlayListProvider key={playListItem.id} playList={playListItem}></PlayListProvider>
                            )
                        })}
                    </>
                )
        }
    }

    return (
        <div className={style.userDetail}>
            <div className={style.headerInfo}>
                {userInfo && <UserInfoHeader userInfo={userInfo} me />}
            </div>
            <TabBar activeIndex={activeTab}>
                {tabList.map((item, index) => {
                    return (
                        <TabBarItem onClick={() => handleChangeTab(index)} key={index} id={index}>
                            {item.title}
                        </TabBarItem>
                    )
                })}
            </TabBar>

            {listLoading ? (
                <Loading />
            ) : (
                <>
                    <div style={{ display: activeTab === 0 ? '' : 'none' }}>{playList(ownList)}</div>
                    <div style={{ display: activeTab === 1 ? '' : 'none' }}>{playList(likeList)}</div>
                </>
            )}
        </div>
    )
}

export default UserDetail