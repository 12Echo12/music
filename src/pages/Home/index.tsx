import { homedir } from "os";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import style from './Home.module.css'




interface HomeProps{}

const Home: FC<HomeProps> = () => {

    const [tabList, setTabList] = useState([
        {
            title: '个性推荐',
            path:'/'
        },
        {
            title: '歌单',
            path: '/songSheets/default/华语',
            regPath: /^\/songSheets/
        },
        {
            title: '排行榜',
            path:'/rank'
        },
        {
            title: '歌手',
            path:'/artists'
        }   
    ])

    return (
        <div className={style.home}>
            <TabBar route={true}>
                {tabList.map((item, index) => {
                    return (
                        <TabBarItem key={index} path={item.path} regPath={item.regPath}>
                            {item.title}
                        </TabBarItem>
                    )
                })}
            </TabBar>
            <div className={style.homeContent}>
                {/* Outlet 组件的作用是占位符，即 子路由组件要展示的位置 */}
                <Outlet />
            </div>
        </div>
    )
}







export default Home